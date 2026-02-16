import { Request, response, Response } from "express";
import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import auth from "../config/auth";
import validate from "../config/validate"; 
import z from "zod";

export class UserController{
    //ato de cadastro
    public static async signUp(req: Request, res: Response){
        try {
            const {firstName, lastName, email, marketingEmail, password} = req.body;
            
            const {salt, hash} = auth.generatePassword(password);
            const createData: Prisma.UserCreateInput = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                marketingEmail: marketingEmail,
                salt: salt,
                hash: hash,
                
                wishlist: {create:{}},
                cart: {create:{}}
            }

            const createdUser = await prisma.user.create({
                data: createData
            });
            res.status(201).json(createdUser);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }
    }

    public static async signIn(req: Request, res: Response){
        try{
            const {email, password} = req.body;
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
            })
            if(!user){
                return res.status(401).json({message: "Email ou senha incorretos"})
                
            }
            const authorized = auth.checkPassword(password, user.hash, user.salt);
            if(!authorized){
                return res.status(401).json({message: "Email ou senha incorretos"})
                
            }
            const token = auth.generateJWT(user.id);
            return res.status(200).json({token: token});
        }catch(error:any){
            res.status(500).json({message: error.message})
        }
        
    }

    public static async readUser(req: Request, res: Response){
        try {
            const {id} = req.params;
            const user = await prisma.user.findUnique({
                where:{
                    id: parseInt(id as string) //garantir q o id seja int, ja q nos params ele é string
                },
                include:{
                    wishlist:true,
                    cart:true,
                    orders:true,
                }
            })
            res.status(200).json(user);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }
    }

    //nao acho que na aplicacao entregavel isso vai ser util, mas vou deixar pra ajudar a debugar e testar
    public static async readAllUsers(req: Request, res: Response){
        try {
            const users = await prisma.user.findMany({
                include:{
                    wishlist:{
                        include:{
                            product:true
                        }
                    },
                    cart:true,
                    orders:true,
                }
            })
            res.status(200).json(users);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }
    }

    public static async updateUser(req: Request, res: Response){
        try {
            const {firstName, lastName, email, gender, phoneNumber, dateBirth, 
                totalOrders, totalRating, totalWishlist, emailNotification, 
                smsNotification, marketingEmail, orderUpdate, newArrival, 
                saleAlert} = req.body;
            const {id} = req.params;
            const updateData: Prisma.UserUpdateInput = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
                phoneNumber: phoneNumber, 
                dateBirth: new Date(dateBirth),
                totalOrders: totalOrders,
                totalRating: totalRating,
                totalWishlist: totalWishlist,
                emailNotification: emailNotification,
                smsNotification: smsNotification,
                marketingEmail: marketingEmail,
                orderUpdate: orderUpdate,
                newArrival: newArrival,
                saleAlert: saleAlert
            }
            const updatedUser = await prisma.user.update({
                where:{
                    id: parseInt(id as string)
                },
                data: updateData
            })
            res.status(200).json(updatedUser);
        } catch (error:any) {
            res.status(500).json({message: error.message})
        }
    }
    //no figma tambem nao vi algo que indicasse excluir conta, mas vou deixar pelo mesmo motivo do readalluser
    public static async deleteUser(req: Request, res: Response){
        try {
            const {id} = req.params;
            const deletedUser = await prisma.user.delete({
                where:{
                    id: parseInt(id as string)
                }
            })
            res.status(200).json(deletedUser)
        } catch (error:any) {
            res.status(500).json({message: error.message})
        }

    }
}