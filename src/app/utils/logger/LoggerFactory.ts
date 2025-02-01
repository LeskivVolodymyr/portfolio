import MongoService from '@/app/_lib/mongo-service';
import MongoLogger from './MongoLogger';
import Logger from './Logger';

class LoggerFactory {
    static createMongoLogger(): Logger {
        const mongoService = new MongoService();
        const mongoLogger = new MongoLogger(mongoService);
        return new Logger(mongoLogger);
    }
}

export default LoggerFactory;
