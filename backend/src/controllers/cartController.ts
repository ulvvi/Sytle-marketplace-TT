import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// ── Cupons válidos ─────────────────────────────────────────────────────────────
// Futuramente pode virar uma tabela no banco.
const VALID_COUPONS: Record<string, number> = {
  SAVE10: 10,
  WELCOME20: 20,
  STUDENTS15: 15,
};

// ── Helper: recalcula subtotal, savings e totalCost ────────────────────────────
// Deve ser chamado após qualquer alteração de quantidade ou aplicação de cupom.
async function recalculateCart(cartId: number, discountPercent = 0) {
  const cartVariants = await prisma.cartVariant.findMany({
    where: { cartId },
    include: { variant: { include: { product: true } } },
  });

  let subtotal = 0;
  let savings = 0;

  for (const cv of cartVariants) {
    const { product } = cv.variant;
    if (product.isOutOfStock) continue;

    const originalPrice = product.price;
    const salePrice = product.SalePrice ?? originalPrice;

    subtotal += salePrice * cv.quantity;
    savings += (originalPrice - salePrice) * cv.quantity;
  }

  const couponDiscount = subtotal * (discountPercent / 100);
  const totalCost = +(subtotal - couponDiscount).toFixed(2);

  return prisma.cart.update({
    where: { id: cartId },
    data: {
      subtotal: +subtotal.toFixed(2),
      savings: +savings.toFixed(2),
      totalCost,
    },
    include: {
      cartVariants: { include: { variant: { include: { product: true } } } },
    },
  });
}

// ── Helper: descobre o % de desconto de um promoCode já salvo ──────────────────
function getStoredDiscount(promoCode: string | null): number {
  if (!promoCode) return 0;
  return VALID_COUPONS[promoCode.toUpperCase()] ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────

export class cartController {

  // ── POST /cart/:userId ────────────────────────────────────────────────────────
  // Adiciona 1 unidade de um variant ao carrinho.
  public static async addVariantToCart(req: Request, res: Response) {
    const { userId } = req.params;
    const { variantId } = req.body;

    try {
      const [variant, cart] = await Promise.all([
        prisma.variant.findUnique({
          where: { id: variantId },
          include: { product: true },
        }),
        prisma.cart.findUnique({
          where: { userId: Number(userId) },
          include: { cartVariants: true },
        }),
      ]);

      if (!variant) return res.status(404).json({ error: "Variante não encontrada." });
      if (!cart)    return res.status(404).json({ error: "Carrinho não encontrado." });

      await prisma.$transaction(async (tx) => {
        const existingItem = cart.cartVariants.find((cv) => cv.variantId === variantId);

        if (existingItem) {
          await tx.cartVariant.update({
            where: { cartId_variantId: { cartId: cart.id, variantId } },
            data: { quantity: { increment: 1 } },
          });
        } else {
          await tx.cartVariant.create({
            data: { cartId: cart.id, variantId, quantity: 1 },
          });
        }
      });

      // Recalcula tudo corretamente (respeita SalePrice e cupom ativo)
      const updatedCart = await recalculateCart(cart.id, getStoredDiscount(cart.promoCode));
      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao adicionar ao carrinho." });
    }
  }

  // ── DELETE /cart/:userId ──────────────────────────────────────────────────────
  // Remove completamente um variant do carrinho (independente da quantidade).
  public static async removeVariant(req: Request, res: Response) {
    const { userId } = req.params;
    const { variantId } = req.body;

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId: Number(userId) },
      });

      if (!cart) return res.status(404).json({ error: "Carrinho não encontrado." });

      const cartItem = await prisma.cartVariant.findUnique({
        where: { cartId_variantId: { cartId: cart.id, variantId } },
      });

      if (!cartItem) {
        return res.status(404).json({ error: "Variante não está no carrinho." });
      }

      await prisma.cartVariant.delete({
        where: { cartId_variantId: { cartId: cart.id, variantId } },
      });

      const updatedCart = await recalculateCart(cart.id, getStoredDiscount(cart.promoCode));
      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao remover item." });
    }
  }

  // ── GET /cart/:userId ─────────────────────────────────────────────────────────
  public static async getCart(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId: Number(userId) },
        include: {
          cartVariants: { include: { variant: { include: { product: true } } } },
        },
      });

      if (!cart) return res.status(404).json({ error: "Carrinho não encontrado." });

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar carrinho.", details: error });
    }
  }

  // ── PATCH /cart/:userId/quantity ──────────────────────────────────────────────
  // Define a quantidade exata de um variant. Se quantity <= 0, remove o item.
  public static async updateQuantity(req: Request, res: Response) {
    const { userId } = req.params;
    const { variantId, quantity } = req.body as { variantId: number; quantity: number };

    try {
      const cart = await prisma.cart.findUnique({ where: { userId: Number(userId) } });
      if (!cart) return res.status(404).json({ error: "Carrinho não encontrado." });

      if (quantity <= 0) {
        await prisma.cartVariant.deleteMany({
          where: { cartId: cart.id, variantId },
        });
      } else {
        await prisma.cartVariant.upsert({
          where: { cartId_variantId: { cartId: cart.id, variantId } },
          update: { quantity },
          create: { cartId: cart.id, variantId, quantity },
        });
      }

      const updatedCart = await recalculateCart(cart.id, getStoredDiscount(cart.promoCode));
      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar quantidade." });
    }
  }

  // ── POST /cart/:userId/promo ───────────────────────────────────────────────────
  // Valida e aplica um cupom de desconto.
  // Retorna { discountPercent, cart } para o frontend atualizar o estado.
  public static async applyPromoCode(req: Request, res: Response) {
    const { userId } = req.params;
    const { code } = req.body as { code: string };

    try {
      const normalizedCode = code.trim().toUpperCase();
      const discountPercent = VALID_COUPONS[normalizedCode];

      if (!discountPercent) {
        return res.status(400).json({ error: "Cupom inválido ou expirado." });
      }

      const cart = await prisma.cart.findUnique({ where: { userId: Number(userId) } });
      if (!cart) return res.status(404).json({ error: "Carrinho não encontrado." });

      await prisma.cart.update({
        where: { id: cart.id },
        data: { promoCode: normalizedCode },
      });

      const updatedCart = await recalculateCart(cart.id, discountPercent);
      return res.status(200).json({ discountPercent, cart: updatedCart });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao aplicar cupom." });
    }
  }
}