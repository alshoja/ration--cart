"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express_validator_1 = require("express-validator");
const user_model_1 = require("models/user.model");
const User = mongoose.model('User', user_model_1.UserSchema);
class UserController {
    getUsers(req, res, next) {
        User.find().then(users => {
            res.status(200).json({ users: users });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    getUser(req, res, next) {
        const userId = req.params.userId;
        User.findById(userId).then(user => {
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ user: user });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    addUser(req, res, next) {
        const validationErrors = express_validator_1.validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(422).json({ message: 'Validation failed', errors: validationErrors.array() });
        }
        bcrypt.hash(req.body.password, 12).then(hashedPw => {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hashedPw
            });
            user.save().then(user => {
                res.status(200).json({ message: 'User successfully registered !', userId: user._id });
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    updateUser(req, res, next) {
        const validationErrors = express_validator_1.validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(422).json({ message: 'Validation failed', errors: validationErrors.array() });
        }
        const userId = req.params.userId;
        User.findById(userId).then((user) => {
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 404;
                throw error;
            }
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;
            return user.save();
        }).then(user => {
            res.status(200).json({ message: 'User updated !', user: user });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    deleteUser(req, res, next) {
        const userId = req.params.userId;
        User.findById(userId).then(user => {
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 404;
                throw error;
            }
            return User.findByIdAndRemove(userId).then(user => {
                res.status(200).json({ message: 'User deleted', user: user });
            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map