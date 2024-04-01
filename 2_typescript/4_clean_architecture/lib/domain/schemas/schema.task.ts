import mongoose, { Document, Model, Schema } from 'mongoose';
import { Status } from '../types/taskStatus';

export interface TaskDocument extends Document {
    title: string;
    text: string;
    created: Date;
    updated: Date;
    expirationDate: Date;
    remindDate: Date;
    status: Status;
    userId: Schema.Types.ObjectId; 
    assignTo: Schema.Types.ObjectId; 
}

const taskSchema = new mongoose.Schema<TaskDocument>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true },
    remindDate: { type: Date, required: true },
    status: { type: String, enum: ['DONE', 'IN-PROGRESS', 'TODO', 'ARCHIVED'], required: true },
    userId: { type: Schema.Types.ObjectId, required: true }, 
    assignTo: { type: Schema.Types.ObjectId, required: true }, 
});

export const TaskModel: Model<TaskDocument> = mongoose.model<TaskDocument>('Task', taskSchema);
