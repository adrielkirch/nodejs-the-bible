import { Service } from 'typedi';
import { Task } from '../../../../domain/entities/entity.task';
import { TaskRepository } from '../../../repositories/repository.task';
import SecurityUtil from '../../../../utils/util.security';

export interface ReadByIdUseCase {
    execute(id:string): Promise<Task | null>;
}

@Service() 
export class ReadByIdUseCaseImpl implements ReadByIdUseCase {
    constructor(private taskRepository: TaskRepository) {
    }

    async execute(id:string): Promise<Task | null> {
        const task = await this.taskRepository.read(id);
        if(!task) {
            throw new Error(`Task ${id} not found`);
        }
        return task;
    }
}
