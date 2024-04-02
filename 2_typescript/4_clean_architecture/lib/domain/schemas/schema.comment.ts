import mongoose, { Document, Model, Schema } from 'mongoose';

export interface CommentDocument extends Document {
    title: string;
    text: string;
    created: Date;
    updated: Date;
    userId: Schema.Types.ObjectId; 
    taskId: Schema.Types.ObjectId; 
}

const commentSchema = new mongoose.Schema<CommentDocument>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, required: true }, 
    taskId: { type: Schema.Types.ObjectId, required: true }, 
});

export const CommentModel: Model<CommentDocument> = mongoose.model<CommentDocument>('Comment', commentSchema);
