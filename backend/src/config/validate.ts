import z from "zod";

const user = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email("Somente email é permitido.")
});

const variant = z.object({
    name: z.string(),
    rating: z.number()
    .min(0, "Nota mínima é 0.")
    .max(5, "Nota máxima é 5.")
});

const createUserValidation = user;

const updateUserValidation = user.partial();

const createProductValidation = variant;

const createReviewValidation = variant.pick({
    rating: true
})


export default {createUserValidation, 
    updateUserValidation, 
    createProductValidation, 
    createReviewValidation};