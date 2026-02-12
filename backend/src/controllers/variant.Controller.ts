import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import validate from "../config/validate"; 
import z from "zod";

// Classe das variantes
export class variantController {
  public static async createVariant(request: Request, response: Response) {
    try {
      const { productId } = request.params;
      const { color, size, stock } = request.body;

      const validation = validate.createVariantValidation.safeParse(request.body);
      if (validation.error) return response.status(400).json({message: z.treeifyError});

      const createdVariant = await prisma.variant.create({
        data: {
          color: color,
          size: size,
          stock: stock,
          product: { connect: { id: parseInt(productId as string) } }, // Conectar explicitamente ao ID do produto
        },
        include: {product: true}
      });

      response.status(201).json(createdVariant);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readAllVariant(request: Request, response: Response) {
    try {
      const { productId } = request.params; // Ver todas as variantes de um produto específico


      const foundAllVariant = await prisma.product.findMany({ // mais prática de fazer a operação usando a model Product para ver todos seus variantes
        where: { id: parseInt(productId as string) },
        include: {variant: true}
      });

      response.status(200).json(foundAllVariant);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readVariant(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const foundVariant = await prisma.variant.findUnique({
        where: { id: parseInt(id as string) },
        include: { product: true }, // Mostrar o produto que essa variante corresponde (chave estrangeira)
      });

      response.status(200).json(foundVariant);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async updateVariant(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const { color, size, stock } = request.body;

      const updatedVariant = await prisma.variant.update({
        where: { id: parseInt(id as string) },
        data: {
          color: color,
          size: size,
          stock: stock,
        },
      });

      response.status(200).json(updatedVariant);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async deleteVariant(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedVariant = await prisma.variant.delete({
        where: { id: parseInt(id as string) },
      });
      response.status(200).json(deletedVariant);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}
