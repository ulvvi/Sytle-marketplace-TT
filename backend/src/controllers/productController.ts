import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { de } from "zod/locales";

// Class do Product
export class productController {
  public static async createProduct(request: Request, response: Response) {
    try {
      const {
        name,
        rating,
        price,
        numOfReviews,
        isOutOfStock,
        color,
        size,
        stock,
        description,
      } = request.body;

      const createdProduct = {
        name: name,
        rating: rating,
        price: price,
        numOfReviews: numOfReviews,
        isOutOfStock: isOutOfStock,
        description: description,
        // Quando se cria um produto, automaticamente, uma variante é criada.
        variant: {
          // Isso já cria a variante vinculado com o ID do produto recém-criado
          create: {
            color: color,
            size: size,
            stock: stock,
          },
        },
      };

      await prisma.product.create({
        data: createdProduct,
        include: { variant: true }, // verificar a variante já ligada ao produto
      });
      response.status(201).json(createdProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readAllProduct(request: Request, response: Response) {
    try {
      const foundAllProduct = await prisma.product.findMany({
        include: { collection: true,
          categories:{
            select:{
            category:true
            }
          }
        },
        
        
      });

      response.status(200).json(foundAllProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const foundProduct = await prisma.product.findUnique({
        where: {
          id: parseInt(id as string),
        },
        include: { 
          variant: true, 
          review: true, 
          collection: true,
          categories: {             
                select: {
                    category: true
                }
            } },
      });

      if (!foundProduct) {
        return response.status(404).json({message: "Produto não encontrado"})
      }

      const formattedProduct = {
        ...foundProduct,
        categories: foundProduct?.categories.map(c => c.category)
      }

      response.status(200).json(formattedProduct);
    } catch (error: any) {
      response.status(500).send({ message: error.message });
    }
  }

  public static async updateProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, rating, price, numOfReviews, isOutOfStock } = request.body;

      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id as string) },
        data: {
          name: name,
          rating: rating, 
          price: price,
          numOfReviews: numOfReviews,
          isOutOfStock: isOutOfStock,
        },
      });

      response.status(200).json(updatedProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async deleteProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id as string) },
      });
      response.status(200).json(deletedProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async postImage(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!request.file) {
        return response.status(400).json({ message: "Nenhum arquivo foi enviado" });
      }

      const photoUrl = `/uploads/photos/${request.file.filename}`;

      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id as string) },
        data: {
          photoUrl: photoUrl,
        },
      });

      response.status(200).json(updatedProduct);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}
