import { Timeout } from "../../domain/types/timeout";

//Singleton class for Scheduler
export default class SchedulerService {
  private static instance: SchedulerService | null = null;
  private schedulers: Map<string, Timeout>;

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
    const maxDelay = 2147483647;
    if (delayInMs > maxDelay) {
      const intervals = Math.ceil(delayInMs / maxDelay);
      let remainingDelay = delayInMs;

      for (let i = 0; i < intervals; i++) {
        const currentDelay = Math.min(remainingDelay, maxDelay);
        const cb =
          i < intervals - 1
            ? () => console.log(`Current interval: ${i}/${intervals}`)
            : callback;
        setTimeout(cb, currentDelay);
        remainingDelay -= maxDelay;
      }
      return;
    }
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
