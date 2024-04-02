import mongoose, { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    password: string;
    name: string;
    created: Date;
    updated: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);
