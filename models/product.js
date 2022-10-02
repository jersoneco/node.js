const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;