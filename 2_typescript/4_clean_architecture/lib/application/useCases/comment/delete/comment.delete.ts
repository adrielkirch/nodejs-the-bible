import { Service } from 'typedi';
import { CommentRepository } from '../../../repositories/repository.comment';


export interface DeleteUseCase {
    execute(id: string): Promise<void>;
}

@Service()
export class DeleteUseCaseImpl implements DeleteUseCase {
    constructor(private commentRepository: CommentRepository) {
    }
    async execute(id: string): Promise<void> {
        const exists = await this.commentRepository.read(id);
        if (!exists) {
            throw new Error(`User ${id} does not exists`);
        }

        await this.commentRepository.delete(id)
    }
}
