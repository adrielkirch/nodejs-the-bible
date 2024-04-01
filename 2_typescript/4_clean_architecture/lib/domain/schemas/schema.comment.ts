import mongoose, { Document, Model } from 'mongoose';

export interface CommentDocument extends Document {
    title: string;
    text: string;
    created: Date;
    updated: Date;
    userId: string;
    taskId: string;
}

const commentSchema = new mongoose.Schema<CommentDocument>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    userId: { type: String, required: true },
    taskId: { type: String, required: true },
});

export const CommentModel: Model<CommentDocument> = mongoose.model<CommentDocument>('Comment', commentSchema);
