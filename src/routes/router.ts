import { UserController } from "../controllers/user.controller";
import { ProductController } from "../controllers/product.controller";
import { AuthController } from "../controllers/account.auth.controller";
import * as express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class Routes {
    public userController: UserController = new UserController();
    public productController: ProductController = new ProductController();
    public authController: AuthController = new AuthController();

    private auth: AuthMiddleware = new AuthMiddleware();

    public routes(app: express.Application): void {
        /*/@Auth Routes /*/
        app.route('/login').post(this.authController.login)
        /*/ @User Routes  /*/
        app.route('/users').get(this.auth.isLoggedin, this.userController.getUsers)
        app.route('/user').post(this.userController.addUser)
        app.route('/user/:userId')
            .get(this.userController.getUser)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser)
        /*/  Product Routes/*/
        app.route('/products').get(this.productController.getProducts)
        app.route('/product').post(this.productController.addProduct)
        app.route('/product/:productId')
            .get(this.productController.getProduct)
            .put(this.productController.updateProduct)
            .delete(this.productController.deleteProduct)
    }
}