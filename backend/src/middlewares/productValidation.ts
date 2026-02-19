import z from "zod";

const product = z.object({

});

const createProductVal = product.extend({
    name: z.string(),
    rating: z.number()
    .min(0, "Nota mínima é 0.")
    .max(5, "Nota máxima é 5."),
    price: z.number(),
    numOfReviews: z.number().int(),
    isOutOfStock: z.boolean(),
    color: z.string(),
    size: z.string(),
    stock: z.int(),
    photoUrl: z.string()
})

const updateProductVal = createProductVal.omit({
    color: true,
    size: true,
    stock: true
}).partial()

export default{
    createProductVal, 
    updateProductVal
}