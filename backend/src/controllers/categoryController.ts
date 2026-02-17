import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Classe das categorias
export class categoryController {
  public static async createCategory(request: Request, response: Response) {
    try {
      const { type } = request.body;

      const createdCategory = await prisma.category.create({
        data: {
          type: type
        }
      });

      response.status(201).json(createdCategory);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readAllCategories(request: Request, response: Response) {
    try {

      const foundAllCategories = await prisma.category.findMany();

      response.status(200).json(foundAllCategories);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async readCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const foundCategory = await prisma.category.findUnique({
        where: { id: parseInt(id as string) },
        include: { 
            products: {
                select: {
                    product: true
                }
            }
            
         },
      });

      if(!foundCategory) {
        return response.status(404).json({message: "Category not found"})
      }

      response.status(200).json(foundCategory);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async updateCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const { type } = request.body;

      const updatedCategory = await prisma.category.update({
        where: { id: parseInt(id as string) },
        data: {
          type : type
        },
      });

      response.status(200).json(updatedCategory);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async deleteCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedCategory = await prisma.category.delete({
        where: { id: parseInt(id as string) },
      });

      response.status(200).json(deletedCategory);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async addToCategory(request: Request, response: Response) {
    try {
      const { categoryId, productId } = request.params

      const createdRelation = await prisma.productCategory.create({
        data: {
          categoryId: Number(categoryId),
          productId: Number(productId)
        }
      });

      response.status(201).json(createdRelation);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }

  public static async delFromCategory(request: Request, response: Response) {
    try {
      const { categoryId , productId } = request.params;

      const deletedRelation = await prisma.productCategory.delete({
        where: { 
            productId_categoryId: {
            categoryId: parseInt(categoryId as string),
            productId: parseInt(productId as string)
        }
        },
      });
      response.status(200).json(deletedRelation);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    }
  }
}

