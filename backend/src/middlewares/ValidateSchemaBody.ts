import { Request, Response, NextFunction } from "express"
import z from "zod"
export function validateRequestBody<T>(schema:z.ZodSchema<T>){
    return(req: Request, res: Response, next: NextFunction)=>{
        
        const validateBody = schema.safeParse(req.body);
        if(!validateBody.success){
            return res.status(400).json({errors: z.treeifyError(validateBody.error)});
        }

        next();
    }
}