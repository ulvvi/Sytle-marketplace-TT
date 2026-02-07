import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Classe das reviews
export class reviewController {
  public static async createReview(request: Request, response: Response) {
    try {
      const { productId } = request.params; // Para associar à review
      const { rating } = request.body;

      const createdReview = await prisma.review.create({
        data: {
          rating,
          product: { connect: { id: parseInt(productId as string) } },
        },
      });

      response.status(201).json(createdReview);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readAllReview(request: Request, response: Response) {
    try {
      const { productId } = request.params; // Ver todas as Reviews de um produto específico

      const foundAllReview = await prisma.review.findMany({
        where: { productId: parseInt(productId as string) },
      });

      response.status(200).json(foundAllReview);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readReview(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const foundReview = await prisma.review.findUnique({
        where: { id: parseInt(id as string) },
        include: { product: true }, // Mostrar o produto que essa Review corresponde (chave estrangeira)
      });

      response.status(200).json(foundReview);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async updateReview(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const { rating } = request.body;

      const updatedReview = await prisma.review.update({
        where: { id: parseInt(id as string) },
        data: {
          rating,
        },
      });

      response.status(200).json(updatedReview);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async deleteReview(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedReview = await prisma.review.delete({
        where: { id: parseInt(id as string) },
      });
      response.status(200).json(deletedReview);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}
