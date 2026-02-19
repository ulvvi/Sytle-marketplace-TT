import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class cartController {
  public static async addVariantToCart(req: Request, res: Response) {
    const { userId } = req.params;
    const { variantId } = req.body;

    try {

      //Busca variante e carrinho em paralelo
      //(isso ajuda a salvar tempo, descobri e é importante especialmente pro cart)
      const [variant, cart] = await Promise.all([
        prisma.variant.findUnique({ 
            where: { id: variantId }, 
            include: { product: true } 
        }),
        prisma.cart.findUnique({ 
            where: { userId: Number(userId) },
            include: { cartVariants: true }
        })
      ]);

      if (!variant) return res.status(404).json({ error: "variante nao encontrada" });
      if (!cart) return res.status(404).json({ error: "usuario nao possui carrinho" });

      const price = variant.product.price;

      const updatedCart = await prisma.$transaction(async (tx) => {
        const existingItem = cart.cartVariants.find(cv => cv.variantId === variantId);

        //tirei o updatedcart porque estava dando problema
        if (existingItem) {
          // se ja tem o item, so aumenta a quantidade
          await tx.cartVariant.update({
            where: { 
                cartId_variantId: { cartId: cart.id, variantId: variantId } 
            },
            data: { quantity: { increment: 1 } }
          });
        } else {
          await tx.cartVariant.create({
            data: {
              cartId: cart.id,
              variantId: variantId,
              quantity: 1
            }
          });
        }

        return tx.cart.update({
          where: { id: cart.id },
          data: {
            subtotal: { increment: price },
            totalCost: { increment: price }
          },
          include: { 
            cartVariants: { 
                include: { variant: { include: { product: true } } } 
            } 
          }
        });
      });

      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).json({ error: "erro ao adicionar ao carrinho"});
    }
  }

  public static async removeVariant(req: Request, res: Response) {
    const { userId } = req.params;
    const { variantId } = req.body;

    try {

      const cartItem = await prisma.cartVariant.findFirst({
        where: { 
          cart: { userId: Number(userId) },
          variantId: variantId 
        },
        include: { 
            variant: { include: { product: true } } 
        }
      });

      if (!cartItem) {
        return res.status(404).json({ error: "Variante não está no seu carrinho." });
      }

      //preço a remover
      const totalToRemove = cartItem.variant.product.price * cartItem.quantity;

      const updatedCart = await prisma.$transaction(async (tx) => {
        await tx.cartVariant.delete({
          where: { 
              cartId_variantId: { cartId: cartItem.cartId, variantId: variantId } 
          }
        });

        return tx.cart.update({
          where: { userId: Number(userId) },
          data: {
            subtotal: { decrement: totalToRemove },
            totalCost: { decrement: totalToRemove }
          },
          include: { 
            cartVariants: { 
                include: { variant: { include: { product: true } } } 
            } 
          }
        });
      });

      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao remover item."});
    }
  }

  public static async getCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const cart = await prisma.cart.findUnique({
        where: { userId: Number(userId) },
        include: {
          cartVariants: {
            include: {
              variant: { include: { product: true } }
            }
          }
        }
      });

      if (!cart) return res.status(404).json({ error: "Carrinho vazio ou não encontrado." });

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar carrinho.", details: error });
    }
  }
}