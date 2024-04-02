import { Service } from 'typedi';
import { TaskRepository } from '../../../repositories/repository.task';
import SchedulerService from '../../../services/service.schedule';


export interface DeleteUseCase {
    execute(id: string): Promise<void>;
}

@Service()
export class DeleteUseCaseImpl implements DeleteUseCase {
    private scheduler = SchedulerService.getInstance();
    constructor(private taskRepository: TaskRepository) {
    }
    async execute(id: string): Promise<void> {
        const exists = await this.taskRepository.read(id);
        if (!exists) {
            throw new Error(`User ${id} does not exists`);
        }

        await this.taskRepository.delete(id)
        this.scheduler.removeScheduler(id);
    }
}
