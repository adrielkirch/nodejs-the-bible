
import { Comment } from "../../domain/entities/entity.comment";

export interface CommentRepository {
    add(title: string, text: string, userId: string, taskId: string): Promise<Comment>;
    update(id: string, title: string, text: string): Promise<void>;
    read(id:string): Promise<Comment | null>;
    readBytask(taskId:string): Promise<Comment[] | null>;
    delete(id:string): Promise<void>;
}