import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true},
    size: { type: String, required: true },
    image: { type: String,required: true}
}, { timestamps: true });

const product = mongoose.model('product', productSchema);
export default product;

