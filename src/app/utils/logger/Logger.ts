import { ILogger } from './ILogger';

class Logger {
    private strategy: ILogger;

    constructor(strategy: ILogger) {
        this.strategy = strategy;
    }

    async logAsync(level: string, message: string) {
        this.strategy.logAsync(level, message);
    }
}

export default Logger;
