import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import * as jwt from 'jsonwebtoken'

export class AuthController {
    public login(req: Request, res: Response, next: NextFunction) {
        let loadedUser;
        User.findOne({ username: req.body.username })
            .then((user: any) => {
                if (!user) {
                    const error: any = new Error('A user or email could not be found');
                    error.status = 401;
                    throw error;
                }
                loadedUser = user;
                return bcrypt.compare(req.body.password, user.password)
            }).then(isEqual => {
                if (!isEqual) {
                    const error: any = new Error('Wrong password !');
                    error.status = 401;
                    throw error;
                }
                const token = jwt.sign({
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                }, 'secret', { expiresIn: '24h' });
                res.status(200).json({ token: token, userId: loadedUser._id.toString() });
            }).catch(err => {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            });
    }
}