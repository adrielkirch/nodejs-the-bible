import { Service } from 'typedi';
import { TaskRepository } from '../../../repositories/repository.task';
import { Status } from '../../../../domain/types/taskStatus';
import SchedulerService from '../../../services/service.schedule';
import DateUtil from '../../../../utils/util.date';


export interface UpdateScheduleUseCase {
    execute(id: string, expirationDate: string, remindDate: string): Promise<void>;
}

@Service()
export class UpdateScheduleUseCaseImpl implements UpdateScheduleUseCase {
    private scheduler = SchedulerService.getInstance();
    constructor(private taskRepository: TaskRepository) {
    }

    async execute(id: string, expirationDate: string, remindDate: string): Promise<void> {
        
        const existData = await this.taskRepository.read(id);

        if (!existData) {
            throw new Error(`Task ${id} does not exist`);
        }


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

        await this.taskRepository.updateSchedule(
            id,
            expirationDateISO,
            remindDateISO
        );

        const ms = DateUtil.timeDifferenceInMs(remindDateISO, now)
        
        this.scheduler.removeScheduler(id);
        this.scheduler.addScheduler(id, async () => {
            const taskFuture = await this.taskRepository.read(id);
            if (!taskFuture) {
                return;
            }
            console.log(`\n
            Reminding to complete task:\n
            Id:${id}\n
            Title:${taskFuture.title}\n
            Text:${taskFuture.text}\n
            Expiration:${taskFuture.expirationDate}\n
            Status: ${taskFuture.status}\n
            `);

            this.scheduler.removeScheduler(id)
        }, ms);
    }

}
