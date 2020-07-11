import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ProductSchema = new Schema(
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
    }, { timestamps: true });
export const Product = mongoose.model('Product', ProductSchema)