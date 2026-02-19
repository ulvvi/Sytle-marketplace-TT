import z from "zod";

const addVariantToCartVal = z.object({
  variantId: z.number().int(),
  quantity: z.number().int().positive("Quantidade deve ser um número positivo"),
});

const removeVariantVal = z.object({
  variantId: z.number().int(),
});




export default {
  addVariantToCartVal,
  removeVariantVal,

};
