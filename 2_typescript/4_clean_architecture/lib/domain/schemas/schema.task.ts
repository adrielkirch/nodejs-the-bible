import mongoose, { Document, Model } from 'mongoose';
import { Status } from '../types/taskStatus';

export interface TaskDocument extends Document {
    title: string;
    text: string;
    created: Date;
    updated: Date;
    expirationDate: Date;
    remindDate: Date;
    status: Status;
}

const taskSchema = new mongoose.Schema<TaskDocument>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true },
    remindDate: { type: Date, required: true },
    status: { type: String, enum: ['DONE', 'IN-PROGRESS', 'TODO', 'ARCHIVED'], required: true }
});

export const TaskModel: Model<TaskDocument> = mongoose.model<TaskDocument>('Task', taskSchema);
