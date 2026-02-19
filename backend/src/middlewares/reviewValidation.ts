import z from "zod"

const createReviewVal = z.object({
     rating: z.number()
        .min(0, "Nota mínima é 0.")
        .max(5, "Nota máxima é 5."),
})

const getProductId = z.object({
    productId: z.coerce.number().int()
})

const updateReviewVal = createReviewVal.partial()

export default{
    createReviewVal,
    getProductId,
    updateReviewVal
}