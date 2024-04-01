import { Service } from 'typedi';
import { Comment } from '../../../../domain/entities/entity.comment';
import { CommentRepository } from '../../../repositories/repository.comment';
import SecurityUtil from '../../../../utils/util.security';

export interface ReadByTaskUseCase {
    execute(id:string): Promise<Comment[] | null>;
}

@Service() 
export class ReadByTaskUseCaseImpl implements ReadByTaskUseCase {
    constructor(private commentRepository: CommentRepository) {
    }

    async execute(taskId:string): Promise<Comment[] | null> {
        const comments = await this.commentRepository.readBytask(taskId);
        if(!comments) {
            throw new Error(`Comments in ${taskId} not found`);
        }
        return comments;
    }
}
