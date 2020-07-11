import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Routes } from './routes/Router'
import errorMiddleware from "../src/middlewares/Error.middleware";
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public mongoUrl: string = 'mongodb+srv://alshoja:alshoja@rationcartcluster.gebgm.mongodb.net/ration?retryWrites=true&w=majority';

    constructor() {
        this.app = express();
        this.logStream();
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
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader(
                'Access-Control-Allow-Methods',
                'OPTIONS, GET, POST, PUT, PATCH, DELETE'
            );
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    private logStream() {
        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
        this.app.use(morgan('combined', { stream: accessLogStream }))
    }

    private handleError() {
        this.app.use(errorMiddleware);
    }

    private mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(res => { console.log('DB Connected') })
            .catch(err => { console.log('Error in mongo connection:', err) });
    }
}
export default new App().app;