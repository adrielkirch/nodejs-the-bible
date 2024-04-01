import { Timeout } from "../../domain/types/timeout";

class Scheduler {
    private static instance: Scheduler | null = null;
    private schedulers: Map<string,Timeout>;

    private constructor() {
        this.schedulers = new Map();
    }

    static getInstance(): Scheduler {
        if (!Scheduler.instance) {
            Scheduler.instance = new Scheduler();
        }
        return Scheduler.instance;
    }

    // Add a scheduler with a callback and delay
    addScheduler(name: string, callback: () => void, delayInMs: number): void {
        const timeoutId = setTimeout(callback, delayInMs);
        this.schedulers.set(name, timeoutId);
    }

    // Remove a scheduler by name
    removeScheduler(name: string): void {
        const timeoutId = this.schedulers.get(name);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.schedulers.delete(name);
        }
    }

    // Other methods and properties of the Scheduler class can be added here
}

// Usage:
const scheduler = Scheduler.getInstance();

// Add schedulers with callbacks and delays
scheduler.addScheduler('scheduler1', () => {
    console.log('Scheduler 1 executed');
}, 1000); // Execute after 1000 milliseconds (1 second)
scheduler.addScheduler('scheduler2', () => {
    console.log('Scheduler 2 executed');
}, 5000); // Execute after 5000 milliseconds (5 seconds)

// Remove a scheduler (optional)
scheduler.removeScheduler('scheduler1');
