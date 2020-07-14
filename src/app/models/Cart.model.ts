import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, { timestamps: true })
export const Cart = mongoose.model('Cart', UserSchema);

