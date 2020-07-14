import HttpException from "../exceptions/HttpErrorException";
import { Request, NextFunction, Response } from "express";
import { Cart } from "../models/Cart.model";
import { validationResult } from "express-validator";

export class CartController {
    public getCartProducts(req: Request, res: Response, next: NextFunction) {
        Cart.find().then(products => {
            res.status(200).json({ products: products });
        }).catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
    }

    public addToCart(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: 'Validation failed', errors: errors.array() })
        }
        if (!req.file) {
            next(new HttpException(422, 'No image provided', res))
        }
        const imageUrl = req.file.path;
        const product = new Cart({
            name: req.body.name,
            image: imageUrl,
            rate: req.body.rate,
            category: req.body.category,
            description: req.body.description,
        });

        product.save().then(productDetails => {
            res.status(200).json({
                message: 'Product saved!',
                product: productDetails
            })
        }).catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
    }

    public deleteCartProduct(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.productId;
        Cart.findById(productId)
            .then(product => {
                if (!product) {
                    next(new HttpException(404, 'Product not found', res));
                }
                return Cart.findByIdAndRemove(productId)
            }).then(productDeleted => {
                res.status(200).json({ message: 'Product deleted', product: productDeleted });
            }).catch(err => {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            });
    }
}