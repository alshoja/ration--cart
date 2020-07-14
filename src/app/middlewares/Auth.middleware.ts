import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken"
import { IRequest } from "../utils/Irequest.interface";
import HttpException from "../exceptions/HttpErrorException";


export class AuthMiddleware {
    public isLoggedin(req: IRequest, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            next(new HttpException(401, 'Unauthorized', res));
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
            next(new HttpException(401, 'Unauthorized', res));
        }
        req.userId = decodedToken.userId;
        next();
    }
}