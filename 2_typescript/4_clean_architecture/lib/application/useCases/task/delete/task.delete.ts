import { Service } from 'typedi';
import { TaskRepository } from '../../../repositories/repository.task';


export interface DeleteUseCase {
    execute(id: string): Promise<void>;
}

@Service()
export class DeleteUseCaseImpl implements DeleteUseCase {
    constructor(private taskRepository: TaskRepository) {
    }
    async execute(id: string): Promise<void> {
        const exists = await this.taskRepository.read(id);
        if (!exists) {
            throw new Error(`User ${id} does not exists`);
        }

        await this.taskRepository.delete(id)
    }
}
