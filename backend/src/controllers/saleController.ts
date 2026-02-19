import { Request, Response } from 'express'
import { prisma } from "../config/prisma";

export class saleController {
    public static async createSale(req: Request, res: Response) {
        try {
            const { discountPercentage, startDate, endDate, productIds } = req.body;
            
            const createdSale = await prisma.sale.create({
                data: {
                    discountPercentage: discountPercentage,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    products: {
                        connect: productIds.map((id: number) => ({ id })),
                    },
                },
                include: { products: true },
            });

            await prisma.product.updateMany({
                where: {
                    id: { in: productIds }
                },
                data: {
                    salePrice: {
                        multiply: (1 - discountPercentage / 100) 
                    }
                }
            });

            res.status(201).json(createdSale);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async addProductsToSale(req: Request, res: Response) {
        try {
            const { saleId } = req.params;
            const { productIds } = req.body;
            const updatedSale = await prisma.sale.update({
                where: { id: parseInt(saleId as string) },
                data: {
                    products: {
                        connect: productIds.map((id: number) => ({ id })),
                    },
                },
                include: { products: true },
            });
            res.status(200).json(updatedSale);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        } 
    }

    public static async deleteSale(req: Request, res: Response) {
        try {
            const { saleId } = req.params;
            await prisma.sale.delete({
                where: { id: parseInt(saleId as string) },
            });
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}