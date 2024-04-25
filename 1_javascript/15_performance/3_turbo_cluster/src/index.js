import os, { cpus } from 'os';
import cluster from 'cluster';
import { initializeServer } from './server.js';


(async () => {
    try {
        // Check if it's not the main process, in which case the orchestrator may create new copies
        if (!cluster.isPrimary) {
            initializeServer();
            return;
        }
        
        // Determine the number of CPUs available asynchronously
        const cpusNumber = os.cpus().length;
        console.log(`Primary: ${process.pid} is running`);
        console.log(`Forking server for ${cpusNumber} CPU\n`);

        // Fork the server for each CPU asynchronously
        const forkPromises = Array.from({ length: cpusNumber }, () => cluster.fork());
        await Promise.all(forkPromises);

        // Handle worker exit: if an error occurred, fork a new worker
        cluster.on('exit', (worker, code, signal) => {
            if (code !== 0 && !worker.exitedAfterDisconnect) {
                console.log(`Worker ${worker.process.pid} died`);
                cluster.fork();
            }
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();