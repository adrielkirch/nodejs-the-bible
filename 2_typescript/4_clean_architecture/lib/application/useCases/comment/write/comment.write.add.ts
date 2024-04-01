import { Service } from 'typedi';
import { Comment } from '../../../../domain/entities/entity.comment';
import { CommentRepository } from '../../../repositories/repository.comment';

export interface AddUseCase {
    execute(title: string, text: string, userId: string, taskId: string): Promise<Comment>;
}

@Service()
export class AddUseCaseImpl implements AddUseCase {
    constructor(private commentRepository: CommentRepository) {
    }
    async execute(title: string, text: string, userId: string, taskId: string): Promise<Comment> {
        const newComment = await this.commentRepository.add(title, text, userId, taskId);
        return newComment;
    }
}
