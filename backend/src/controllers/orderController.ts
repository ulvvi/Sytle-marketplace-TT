import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class orderController {
    
    public static async createOrder (req: Request, res: Response) {
        try {
            
            const { userId, adress } = req.body;

            const cart = await prisma.cart.findUnique({
                where: { userId: userId },
                include: {
                    cartVariants: {
                        include: {
                            variant: true
                        }
                    }
                }
            });

            const order = await prisma.$transaction(async (tx:any) => {

                if (cart === null || cart.cartVariants.length === 0) {
                    throw new Error("O carrinho está vazio.");
                }

                const createdOrder = await tx.order.create({
                    data: {
                        userId: userId,
                        address: adress,
                        situation: "PROCESSING",
                        totalPrice: cart.totalCost,
                        variants: { 
                            create: cart.cartVariants.map((cartVariant: any) => ({
                                variantId: cartVariant.variantId,
                                unitPrice: cartVariant.variant.price,
                                quantity: 1
                            }))
                        }
                    },
                
                    include: { variants: true }  
            });
                await tx.cartVariant.deleteMany({
                    where: { cartId: cart.id }
                });

                await tx.cart.update({
                    where: { id: cart.id },
                    data: {
                        subtotal: 0,
                        total: 0
                    }
                });

                return createdOrder;
            });

            
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: "Internal server error.", message: error });
        }
    }

    public static async getUserOrders (req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const orders = await prisma.order.findMany({
                where: { userId: Number(userId) },
                include: {
                    variants: {
                        include: {
                            variant: true
                        }
                    }
                }
            });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "Internal server error.", message: error });
        }
    }

    public static async updateSituation (req: Request, res: Response) {
        const { orderId } = req.params;
        const { situation } = req.body;
        try {
            const updatedOrder = await prisma.order.update({
                where: { id: Number(orderId) },
                data: { situation: situation }
            });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: "Internal server error.", message: error });
        }

    }
}