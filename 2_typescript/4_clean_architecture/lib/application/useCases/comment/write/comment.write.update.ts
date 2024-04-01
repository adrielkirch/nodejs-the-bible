import { Service } from 'typedi';
import { CommentRepository } from '../../../repositories/repository.comment';

export interface UpdateUseCase {
    execute(id: string, title: string, text: string): Promise<void>;
}

@Service()
export class UpdateUseCaseImpl implements UpdateUseCase {
    constructor(private taskRepository: CommentRepository) {
    }

    async execute(id: string, title: string, text: string): Promise<void> {
        const exists = await this.taskRepository.read(id);

        if (!exists) {
            throw new Error(`Comment ${id} does not exists`);
        }

        await this.taskRepository.update(id, title, text)
    }
}
