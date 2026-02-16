import z from "zod"
const addWishlistVal = z.object({
    productId: z.number()
})
const delWishlistVal = addWishlistVal;

const getUserId = z.object({
    id: z.coerce.number().int()
})


export default{
    addWishlistVal,
    delWishlistVal,
    getUserId
}