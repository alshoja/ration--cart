import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // products: [{
    //     type: Schema.Types.ObjectId,
    //     ref:'Product'
    // }]
}, { timestamps: true })