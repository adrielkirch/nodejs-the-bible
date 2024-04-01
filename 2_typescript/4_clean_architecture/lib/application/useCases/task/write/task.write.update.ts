import { Service } from 'typedi';
import { TaskRepository } from '../../../repositories/repository.task';
import { Status } from '../../../../domain/types/taskStatus';
import DateUtil from '../../../../utils/util.date';


export interface UpdateUseCase {
    execute(id: string, title: string, text: string, status: Status, assignTo: string): Promise<void>;
}

@Service()
export class UpdateUseCaseImpl implements UpdateUseCase {
    constructor(private taskRepository: TaskRepository) {
    }

    async execute(id: string, title: string, text: string, status: Status, assignTo: string): Promise<void> {
        const existData = await this.taskRepository.read(id);

        if (!existData) {
            throw new Error(`Task ${id} does not exist`);
        }

        const updateData = {
            title,
            text,
            status,
            assignTo
        };

        for (const key in updateData) {
            if (Object.prototype.hasOwnProperty.call(existData, key)) {
                if (existData[key] !== updateData[key] && updateData[key] !== null) {
                    existData[key] = updateData[key];
                }
            }
        }

        await this.taskRepository.update(
            id,
            existData.title,
            existData.text,
        
            existData.status,
            existData.assignTo
        );
    }

}
