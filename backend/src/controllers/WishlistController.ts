import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import {Prisma} from "../generated/prisma/client";

//obs: o id que to usando nas querys é do usuario
export class Wishlist{
    //ler a wl
    public static async readWishlist(req: Request, res: Response){
        try {
            const {id} = req.params;
            const wishlist = await prisma.wishlist.findUnique({
                where:{
                    userId: parseInt(id as string)
                }
            })
            res.status(200).json(wishlist);
        } catch (error:any) {
            res.status(500).json({message: error.message})
        }
    }
    //updatar ela
    public static async updateWishlist(req: Request, res: Response){
        try {
            const {id} = req.params;
            const {quantity} = req.body;
 
            const updatedWishlist = await prisma.wishlist.update({
                where:{
                    userId: parseInt(id as string)
                },
                data:{
                    quantity:quantity
                }
            })
            res.status(200).json(updatedWishlist);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }
    }
    //funcao separada pra add itens(podia ter feito no update mas na minha cabeça fica mais organizado assim. posso juntar dps se for o caso)
    //n tenho certeza se ta certo pq n consegui testar por n ter as models necessarias nessa branch
    /*
    public static async addToWishlist(req:Request, res: Response){
        const {id} = req.params;
        const {productId} = req.body;
        const added = await prisma.wishlist.update({
            where:{
                userId: parseInt(id as string)
            },
            data:{
                product:{
                    create:{
                        productId: productId
                    }
                }
            }
        })
    }*/
}