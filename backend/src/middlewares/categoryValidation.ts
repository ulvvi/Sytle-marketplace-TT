import z from "zod";
import { CategoryType } from "../generated/prisma/enums";

const createCategoryVal = z.object({
  type: z.enum(CategoryType),
});

const updateCategoryVal = createCategoryVal.partial();

const addToCategoryVal = z.object({
  categoryId: z.coerce.number().int(),
  productId: z.coerce.number().int(),
});

const delFromCategoryVal = z.object({
  categoryId: z.coerce.number().int(),
  productId: z.coerce.number().int(),
});

export default {
  createCategoryVal,
  updateCategoryVal,
  addToCategoryVal,
  delFromCategoryVal,
};
