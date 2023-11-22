import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../utils/enum';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '2023';
const UNAUTHORIZED_ERROR_MESSAGE = 'Usuario não possui autorização necessaria para está ação....'


export const generateToken = async (dados: any) => {
    return jwt.sign(dados.toJSON(), JWT_SECRET);
};


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: UNAUTHORIZED_ERROR_MESSAGE });
    }
    try {
        
        const [, token] = authorization.split(" ")
        const decoded = jwt.verify(token, JWT_SECRET);
        res.locals.jwtPayload = decoded;
        return next()
    } catch (error) {
        return res.status(401).send({ error: UNAUTHORIZED_ERROR_MESSAGE });
    }
    
};

export const verifyAdm = (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = res.locals.jwtPayload;
        if (user.type === UserType.ADM){
            next();
        }else{
            throw UNAUTHORIZED_ERROR_MESSAGE
        }
    }catch(error){
        res.status(401).json({ error:error.message || UNAUTHORIZED_ERROR_MESSAGE })
    }
}

export const verifyAdmAndFuncionario = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.jwtPayload;
        if (user.type === UserType.ADM || user.type === UserType.FUNCIONARIO) {
            return next();
        }else{
            throw UNAUTHORIZED_ERROR_MESSAGE
        }
    } catch (error) {
        return res.status(401).json({ error:error.message || UNAUTHORIZED_ERROR_MESSAGE });
    }
};