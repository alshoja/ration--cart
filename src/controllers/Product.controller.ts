import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Product } from '../models/Product.model';
import HttpException from '../exceptions/HttpErrorException';


export class ProductController {

    public getProducts(req: Request, res: Response, next: NextFunction) {
        Product.find().then(products => {
            res.status(200).json({ products: products });
        }).catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
    }

    public getProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.params.productId;
        Product.findById(id).then(product => {
            if (!product) {
                next(new HttpException(404, 'Product not found', res));
            }
            res.status(200).json({ product: product });
        }).catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
    }

    public addProduct(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: 'Validation failed', errors: errors.array() })
        }
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
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

    public updateProduct(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.productId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new HttpException(422, 'Validation failed', res));
        }
        Product.findById(productId).then((product: any) => {
            if (!product) {
                next(new HttpException(404, 'Product not found', res));
            }
            product.name = req.body.name;
            product.image = req.body.image;
            product.rate = req.body.rate;
            product.category = req.body.category;
            product.description = req.body.description;
            return product.save();
        }).then(details => {
            res.status(200).json({ message: 'Product updated!', product: details });
        }).catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
    }

    public deleteProduct(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.productId;
        Product.findById(productId)
            .then(product => {
                if (!product) {
                    next(new HttpException(404, 'Product not found', res));
                }
                return Product.findByIdAndRemove(productId)
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