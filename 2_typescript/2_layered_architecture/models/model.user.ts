import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * Mongoose Model Schema for User
 *
 * Schema Fields:
 * - email: String (required, unique)
 * - name: String (required)
 * - password: String (required)
 */
export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    created: Date;
}

export interface IUserModel extends Document {
    _id: Types.ObjectId;
    email: string;
    name: string;
    password: string;
    created: Date;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
