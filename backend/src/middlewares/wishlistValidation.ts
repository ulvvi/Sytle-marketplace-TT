import z from "zod"
const addWishlistVal = z.object({
    productId: z.number()
})
const delWishlistVal = addWishlistVal;



export default{
    addWishlistVal,
    delWishlistVal,

}