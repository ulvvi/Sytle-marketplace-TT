import z from "zod"
import { Gender } from "../generated/prisma/enums";

const signUpVal = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email("Somente email é permitido."),
    marketingEmail: z.boolean(),
    password: z.string()
});

const signInVal= signUpVal.pick({
    email:true,
    password:true
})


const updateUserVal= signUpVal.partial().extend({
    gender: z.enum(Gender),
    phoneNumber: z.string().min(10, {message: "Telefone deve ter DDD + número"}).max(11, {message: "Telefone não pode ter mais de 11 dígitos"}),
    dateBirth: z.coerce.date(),
    emailNotification: z.boolean(),
    smsNotification: z.boolean(),
    orderUpdate: z.boolean(),
    newArrival: z.boolean(),
    saleAlert: z.boolean()
}).partial()

export default{
    signUpVal,
    signInVal,
    updateUserVal,
}