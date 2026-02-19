import z from "zod";
import { OrderStatus } from "../generated/prisma/enums";

const createOrderVal = z.object({
  address: z.string().optional(),
  rastreio: z.string().optional(),
  situation: z.enum(OrderStatus).optional(),
  totalPrice: z.number().positive("Preço total deve ser um número positivo"),
});

const updateOrderVal = z.object({
  address: z.string().optional(),
  rastreio: z.string().optional(),
  situation: z.enum(OrderStatus).optional(),
  totalPrice: z.number().positive("Preço total deve ser um número positivo").optional(),
});

export default {
  createOrderVal,
  updateOrderVal,
};
