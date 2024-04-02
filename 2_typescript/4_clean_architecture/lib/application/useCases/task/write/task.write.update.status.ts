import { Service } from 'typedi';
import { TaskRepository } from '../../../repositories/repository.task';
import { Status } from '../../../../domain/types/taskStatus';
import SchedulerService from '../../../services/service.schedule';


export interface UpdateStatusUseCase {
    execute(id: string, status:Status): Promise<void>;
}

@Service()
export class UpdateStatusUseCaseImpl implements UpdateStatusUseCase {
    private scheduler = SchedulerService.getInstance();
    constructor(private taskRepository: TaskRepository) {
    }

    async execute(id: string, status:Status): Promise<void> {
    console.log("Status: ",status)
        const existData = await this.taskRepository.read(id);

        if (!existData) {
            throw new Error(`Task ${id} does not exist`);
        }

        await this.taskRepository.updateStatus(
            id,
            status,
        ); 

        const completedStatus = ["DONE", "ARCHIVED"]
        if (completedStatus.includes(status)) {
            this.scheduler.removeScheduler(id);
        }
        
    }

}
