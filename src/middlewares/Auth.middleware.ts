import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken"
import { IRequest } from "../utils/Irequest.interface";


export class AuthMiddleware {
    public isLoggedin(req: IRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            const error: any = new Error('Not authenticated');
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'secret');
        } catch (err) {
            err.statusCode = 500
            throw err;
        }
        if (!decodedToken) {
            const error: any = new Error('Not authenticated');
            error.statusCode = 401;
            throw error;
        }
        req.userId = decodedToken.userId;
        next();
    }
}