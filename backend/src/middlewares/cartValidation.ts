import z from "zod";

const addVariantToCartVal = z.object({
  variantId: z.number().int(),

});

const removeVariantVal = z.object({
  variantId: z.number().int(),
});

// PATCH /cart/:userId/quantity
export const updateQuantityVal = z.object({
  variantId: z.number().int().positive(),
  quantity: z.number().int().min(0), // 0 = remove o item
});

// POST /cart/:userId/promo
export const applyPromoVal = z.object({
  code: z.string().min(1).max(30),
});


export default {
  addVariantToCartVal,
  removeVariantVal,
  updateQuantityVal,
  applyPromoVal
};
