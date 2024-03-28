import mongoose, { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    password: string;
    name: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);
