import { Timeout } from "../../domain/types/timeout";

//Singleton class for Scheduler
export default class SchedulerService {
    private static instance: SchedulerService | null = null;
    private schedulers: Map<string,Timeout>;

    private constructor() {
        this.schedulers = new Map();
    }

    static getInstance(): SchedulerService {
        if (!SchedulerService.instance) {
            SchedulerService.instance = new SchedulerService();
        }
        return SchedulerService.instance;
    }

    addScheduler(name: string, callback: () => void, delayInMs: number): void {
        const timeoutId = setTimeout(callback, delayInMs);
        this.schedulers.set(name, timeoutId);
    }

    removeScheduler(name: string): void {
        const timeoutId = this.schedulers.get(name);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.schedulers.delete(name);
        }
    }
}

