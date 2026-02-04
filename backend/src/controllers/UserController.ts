import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import {Prisma} from "../generated/prisma/client";

export class UserController{
    //ato de cadastro
    public static async SignUp(req: Request, res: Response){
        try {
            const {firstName, lastName, email} = req.body;
            const createData: Prisma.UserCreateInput = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                wishList: {create:{}}
                //Cart: {create:{}}
            }
            const createdUser = await prisma.user.create({
                data: createData
                
            });
            res.status(201).json(createdUser);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }
    }

    public static async readUser(req: Request, res: Response){
        try {
            const {id} = req.params;
            const user = await prisma.user.findUnique({
                where:{
                    id: parseInt(id as string) //garantir q o id seja int, ja q nos params ele é string
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
            const users = await prisma.user.findMany()
            res.status(200).json(users);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }
    }

    public static async updateUser(req: Request, res: Response){
        try {
            const {firstName, lastName, email, gender, phoneNumber, dateBirth, preferences, 
                totalOrders, totalRating, totalWishlist} = req.body;
            const {id} = req.params;
            
            const updateData: Prisma.UserUpdateInput = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
                phoneNumber: phoneNumber,
                dateBirth: dateBirth,
                preferences: preferences,
                totalOrders: totalOrders,
                totalRating: totalRating,
                totalWishlist: totalWishlist
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