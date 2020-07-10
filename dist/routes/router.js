"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const controller_1 = require("controllers/controller");
class Routes {
    constructor() {
        this.userController = new controller_1.UserController();
    }
    routes(app) {
        app.route('/').get(this.userController.getUsers);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=router.js.map