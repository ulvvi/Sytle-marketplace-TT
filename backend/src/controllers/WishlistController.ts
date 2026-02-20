import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

//obs: o id que to usando nas querys é do usuario
export class Wishlist{
    public static async readWishlist(req: Request, res: Response){
        try {
            const {userId} = req.params;
            const wishlist = await prisma.wishlist.findUnique({
                where:{
                    userId: parseInt(userId as string)
                },
                include:{
                    product:{
                        include:{
                            product: true
                        }
                    }
                }
            })
            res.status(200).json(wishlist);
        } catch (error:any) {
            res.status(500).json({message: error.message})
        }
    }

   public static async addToWishlist(req:Request, res: Response){
        try {
            const {userId} = req.params;
            const {productId} = req.body;
            const added = await prisma.wishlist.update({
                where:{
                    userId: parseInt(userId as string)
                },
                data:{
                    quantity:{
                        increment:1
                    },
                    product:{
                        create:{
                            productId: productId
                        }
                    }
                },
                include:{
                    product:{
                        include:{
                            product:true
                        }
                    }
                }
            })

            const user = await prisma.user.findUnique({
                where:{
                    id: parseInt(userId as string)
                },
                include:{
                    wishlist: true
                }
            })

            await prisma.user.update({
                where:{
                    id: parseInt(userId as string)
                },                
                data:{
                    totalWishlist: user?.totalWishlist ? user.totalWishlist + 1 : 1
                }
            })
            res.status(200).json(added);
        } catch (error:any) {
            res.status(500).json({message: error.message})
        }

    }

    //dessa vez to usando a instancia da tabela auxiliar pra me facilitar um pouco
    public static async DelFromWishlist(req:Request, res:Response){
        try {

            const {userId} = req.params;
            const {productId} = req.body;
            //acabei tendo q aprender transactions pq se nao poderia dar o maior b.o com uma possivel dessincronizacao da quantidade
            //em casos onde se deleta nada, mas é possivel requisitar a rota de deletar da wl por meio de algum bug ou algum fator
            //relacionado ao frontend
            //n precisei usar transaction na parte de add pq a atomicidade nela ja é garantida
            const result = await prisma.$transaction(async (tx) =>{
                const removed = await tx.wishlistProduct.deleteMany({
                    where:{
                        productId:productId,
                        wishlist:{
                            userId:parseInt(userId as string)
                        }
                    }
                })
                if(removed.count == 0){
                    throw new Error("Product not found in wishlist");
                }
                const wishlist = await tx.wishlist.update({
                    where:{
                        userId:parseInt(userId as string)
                    },
                    data:{
                        quantity:{
                            decrement:1
                        }
                    },
                    include:{
                        product:{
                            include:{
                                product: true
                            }
                        }
                    }
                })
                
                return wishlist
            })
            res.status(200).json({result});
        } catch (error:any) {
            if (error.message == "Product not found in wishlist") {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({message:error.message});
        }
    }
}