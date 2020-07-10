import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Routes } from '../src/routes/router'

class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public mongoUrl: string = 'mongodb+srv://alshoja:alshoja@rationcartcluster.gebgm.mongodb.net/ration?retryWrites=true&w=majority';

    constructor() {
        this.app = express();
        this.config();
        this.setHeaders()
        this.handleError();
        this.route.routes(this.app);
        this.mongoSetup()
    }

    private config(): void {
        dotenv.config();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setHeaders() {
        this.app.use((_req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader(
                'Access-Control-Allow-Methods',
                'OPTIONS, GET, POST, PUT, PATCH, DELETE'
            );
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    private handleError() {
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            console.log(error);
            const status = error.statusCode || 500;
            const message = error.message;
            res.status(status).json({ message: message });
        });
    }

    private mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(res => { console.log('mongodb connected') })
            .catch(err => { console.log('mongo error in connection:', err) });
    }
}
export default new App().app;