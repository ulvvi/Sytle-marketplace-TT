import * as fs from "node:fs";
import * as path from "node:path";
import { Request, Response, NextFunction } from "express";

import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { prisma } from "../config/prisma";

const keysDir = path.resolve(__dirname, '..', '..', 'keys');

const PUB_KEY_PATH = path.join(keysDir, "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(PUB_KEY_PATH, "utf-8");

passport.use(new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: PUB_KEY,
        algorithms: ['RS256'],
        ignoreExpiration: false
    },
    (payload, done) => {
        prisma.user.findUnique({
            where: { id: payload.sub.id },
        })
        .then(user => {
            if (!user) return done(null, false);
            
            return done(null, payload.sub);
        })
        .catch(err => {
            return done(err, false);
        });
    }
));

export async function ensureOwner(req: Request, res: Response, next: NextFunction){
    try {
        const {userId} = req.params;

        const targetId = parseInt(userId as string);
        //to pegando as infos do token em req.token_user pq foi definido ali na linha 58 pra salvar o objeto do token nessa propriedade
        const {id:tokenId} = (req as any).token_user;
        
        console.log(tokenId)
        console.log(targetId)
        

        if(!targetId || targetId != tokenId){
            return res.status(401).json({message:"Token não autorizado"})
        }
        next();
        
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
    
}

export const authenticateJWT = passport.authenticate('jwt', { session: false, assignProperty: 'token_user' });