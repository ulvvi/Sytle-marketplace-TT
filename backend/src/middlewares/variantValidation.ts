import z from "zod"

const createVariantVal = z.object({
    color: z.string(),
    size: z.string(),
    stock: z.number().int()
})

const getProductId = z.object({
    productId:  z.coerce.number().int()
})
const updateVariantVal = createVariantVal.partial();

export default{
    createVariantVal,
    getProductId,
    updateVariantVal
}