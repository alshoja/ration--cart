import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        userId: {
            type: String
        }
    }, { timestamps: true })