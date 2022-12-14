import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const refrece = new Schema({
    token:{ type: String, unique: true }
   
}, { timestamps: false });

const refrecetoken = mongoose.model('refrecetoken', refrece);
export default refrecetoken;

