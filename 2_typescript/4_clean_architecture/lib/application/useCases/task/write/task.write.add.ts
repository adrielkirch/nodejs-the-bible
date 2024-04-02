import { Service } from 'typedi';
import { Task } from '../../../../domain/entities/entity.task';
import { TaskRepository } from '../../../repositories/repository.task';
import DateUtil from '../../../../utils/util.date';
import SchedulerService from '../../../services/service.schedule';
export interface AddUseCase {
    execute(title: string, text: string, expirationDate: string, remindDate: string, assignTo: string, userId: string): Promise<Task>;
}

@Service()
export class AddUseCaseImpl implements AddUseCase {
    private scheduler = SchedulerService.getInstance();
    constructor(private taskRepository: TaskRepository) {
    }
    async execute(title: string, text: string, expirationDate: string, remindDate: string, assignTo: string, userId: string): Promise<Task> {

        if (!DateUtil.isDefaultFormat(expirationDate) || !DateUtil.isDefaultFormat(remindDate)) {
            throw new Error(`Invalid expirationDate or remindDate format it should be "MM/DD/YYYY HH:mm:ss"`);
        }
        const expirationDateISO = DateUtil.defaultFormatToISO(expirationDate)
        const remindDateISO = DateUtil.defaultFormatToISO(remindDate)

        const isExpirationDateSameOrAfter = DateUtil.isSameOrAfter(expirationDateISO, remindDateISO);

        if (!isExpirationDateSameOrAfter) {
            throw new Error(`expirationDate date must be same or after of remindDate`);
        }
        const now = new Date();

        const isNowDateSameOrAfter = DateUtil.isSameOrAfter(now, remindDateISO);

        if (isNowDateSameOrAfter) {
            throw new Error(`Now date not must be same or after of remindDate`);
        }

        const newTask = await this.taskRepository.add(title, text, expirationDateISO, remindDateISO, assignTo, userId);
        const taskId = newTask._id.toString();

        const ms = DateUtil.timeDifferenceInMs(remindDateISO, now)

        this.scheduler.addScheduler(taskId, async () => {
            const taskFuture = await this.taskRepository.read(taskId);
            if (!taskFuture) {
                return;
            }
            console.log(`\n
            Reminding to complete task:\n
            Id:${taskId}\n
            Title:${taskFuture.title}\n
            Text:${taskFuture.text}\n
            Expiration:${taskFuture.expirationDate}\n
            Status: ${taskFuture.status}\n
            `);

            this.scheduler.removeScheduler(taskId)
        }, ms);

        return newTask;
    }
}
