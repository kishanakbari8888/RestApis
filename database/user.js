import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, default: 'customer' },
}, { timestamps: true });

const users = mongoose.model('users', userSchema);
export default users;
