import { UserController } from "../controllers/User.controller";
import { ProductController } from "../controllers/Product.controller";
import { AuthController } from "../controllers/Auth.controller";
import * as express from "express";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import { body } from 'express-validator';
import { User } from "../models/User.model";


export class Routes {
    public userController: UserController = new UserController();
    public productController: ProductController = new ProductController();
    public authController: AuthController = new AuthController();

    private auth: AuthMiddleware = new AuthMiddleware();

    public routes(app: express.Application): void {

        /*/@Auth Routes /*/
        app.route('/login').post(
            [
                body('username').trim().isEmail().withMessage('Please enter a valid email.'),
                body('password').trim().isLength({ min: 5 }),
            ], this.authController.login)

        /*/ @User Routes  /*/
        app.route('/users').get(this.auth.isLoggedin, this.userController.getUsers)
        app.route('/user').post(
            [
                body('username').isEmail()
                    .withMessage('Please enter a valid email.')
                    .custom((value, { req }) => {
                        return User.findOne({ username: value }).then(user => {
                            if (user) {
                                return Promise.reject('E-mail already exists')
                            }
                        })
                    })
                    .normalizeEmail(),
                body('password').trim().isLength({ min: 5 }),
                body('name').trim().not().notEmpty()
            ], this.userController.addUser)
        app.route('/user/:userId')
            .get(this.auth.isLoggedin, this.userController.getUser)
            .put(this.auth.isLoggedin, [
                body('username').isEmail()
                    .withMessage('Please enter a valid email.')
                    .custom((value, { req }) => {
                        return User.findOne({ username: value }).then(user => {
                            if (user) {
                                return Promise.reject('E-mail already exists')
                            }
                        })
                    })
                    .normalizeEmail(),
                body('password').trim().isLength({ min: 5 }).withMessage('Atleast 5 char long'),
                body('name').trim().not().notEmpty()
            ], this.userController.updateUser)
            .delete(this.auth.isLoggedin, this.userController.deleteUser)

        /*/  Product Routes/*/
        app.route('/products').get(this.productController.getProducts)
        app.route('/product').post(this.auth.isLoggedin,
            [
                body('name').trim().isLength({ min: 4 }).withMessage('Atleast 4 char long'),
                body('rate').trim().isNumeric({ no_symbols: true }).withMessage('Should be  a number'),
                body('category').trim(),
                body('description').trim(),
            ], this.productController.addProduct)
        app.route('/product/:productId')
            .get(this.productController.getProduct)
            .put(this.auth.isLoggedin, [
                body('name').trim().isLength({ min: 4 }).withMessage('Atleast 4 char long'),
                body('rate').trim().isNumeric({ no_symbols: true }).withMessage('Should be number'),
                body('category').trim(),
                body('description').trim(),
            ], this.productController.updateProduct)
            .delete(this.auth.isLoggedin, this.productController.deleteProduct)
    }
}