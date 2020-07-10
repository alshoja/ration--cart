"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router_1 = require("../src/routes/router");
class App {
    constructor() {
        this.route = new router_1.Routes();
        this.mongoUrl = 'mongodb+srv://alshoja:alshoja@rationcartcluster.gebgm.mongodb.net/ration?retryWrites=true&w=majority';
        this.app = express();
        this.config();
        this.handleError();
        this.route.routes(this.app);
        this.mongoSetup();
    }
    config() {
        dotenv.config();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    handleError() {
        this.app.use((_req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }
    mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(res => { console.log('mongodb connected'); })
            .catch(err => { console.log('mongo error in connection:', err); });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map