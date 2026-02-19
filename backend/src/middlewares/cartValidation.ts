import z from "zod";

const addVariantToCartVal = z.object({
  variantId: z.number().int(),

});

const removeVariantVal = z.object({
  variantId: z.number().int(),
});




export default {
  addVariantToCartVal,
  removeVariantVal,

};
