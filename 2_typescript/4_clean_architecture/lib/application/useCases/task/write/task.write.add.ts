import { Service } from 'typedi';
import { Task } from '../../../../domain/entities/entity.task';
import { TaskRepository } from '../../../repositories/repository.task';
import DateUtil from '../../../../utils/util.date';

export interface AddUseCase {
    execute(title: string, text: string, expirationDate: string, remindDate: string, assignTo: string, userId: string): Promise<Task>;
}

@Service()
export class AddUseCaseImpl implements AddUseCase {
    constructor(private taskRepository: TaskRepository) {
    }
    async execute(title: string, text: string, expirationDate: string, remindDate: string, assignTo: string, userId: string): Promise<Task> {

        if (!DateUtil.isDefaultFormat(expirationDate) || !DateUtil.isDefaultFormat(remindDate)) {
            throw new Error(`Invalid expirationDate or remindDate format it should be "MM/DD/YYYY HH:mm:ss"`);
        }
        const expirationDateISO = DateUtil.defaultFormatToISO(expirationDate) 
        const remindDateISO = DateUtil.defaultFormatToISO(remindDate)
     
        const isExpirationDateSameOrAfter = DateUtil.isSameOrAfter(expirationDateISO, remindDateISO);
       
        if(!isExpirationDateSameOrAfter) {
            throw new Error(`expirationDate date must be same or after of remindDate`);
        }

        const isNowDateSameOrAfter = DateUtil.isSameOrAfter(new Date(), remindDateISO);

        if(isNowDateSameOrAfter) {
            throw new Error(`Now date not must be same or after of remindDate`);
        }

        const newTask = await this.taskRepository.add(title, text, expirationDateISO, remindDateISO, assignTo, userId);
        return newTask;
    }
}
