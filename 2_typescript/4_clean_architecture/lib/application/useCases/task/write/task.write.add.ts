import { Service } from 'typedi';
import { Task } from '../../../../domain/entities/entities.task';
import { TaskRepository } from '../../../repositories/repository.task';
import SecurityUtil from '../../../../utils/util.security';

export interface AddUseCase {
    execute(title: string, text: string, expirationDate: Date, remindDate: Date): Promise<Task>;
}

@Service()
export class AddUseCaseImpl implements AddUseCase {
    constructor(private taskRepository: TaskRepository) {
    }
    async execute(title: string, text: string, expirationDate: Date, remindDate: Date): Promise<Task> {
        const newTask = await this.taskRepository.add(title, text, expirationDate, remindDate);
        return newTask;
    }
}
