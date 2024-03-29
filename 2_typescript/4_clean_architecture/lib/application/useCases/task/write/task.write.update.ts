import { Service } from 'typedi';
import { TaskRepository } from '../../../repositories/repository.task';
import { Status } from '../../../../domain/types/taskStatus';


export interface UpdateUseCase {
    execute(id: string, title: string, text: string, expirationDate: Date, remindDate: Date, status: Status): Promise<void>;
}

@Service()
export class UpdateUseCaseImpl implements UpdateUseCase {
    constructor(private taskRepository: TaskRepository) {
    }

    async execute(id: string, title: string, text: string, expirationDate: Date, remindDate: Date, status: Status): Promise<void> {
        const exists = await this.taskRepository.read(id);

        if (!exists) {
            throw new Error(`User ${id} does not exists`);
        }

        await this.taskRepository.update(id, title, text, expirationDate, remindDate,status)
    }
}
