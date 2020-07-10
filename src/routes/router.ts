import { UserController } from "../controllers/user.controller";

export class Routes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route('/').get(this.userController.getUsers)
    }
}