import { Request, NextFunction, Response } from "express";

export interface IRequest extends Request {
    userId: string
}