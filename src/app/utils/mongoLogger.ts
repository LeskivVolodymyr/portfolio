import { Collection, Document } from 'mongodb';
import MongoService from '@/app/_lib/mongo-service';

class MongoLogger {
    private logsCollectionName: string = 'logs';
    private collection: Collection<Document> | undefined;
    private readonly mongoService: MongoService;

    constructor() {
        this.mongoService = new MongoService();
    }

    private async getCollection() {
        if (!this.collection)
            this.collection = await this.mongoService.getCollection(
                this.logsCollectionName
            );
        return this.collection;
    }

    async log(level: string, message: string) {
        const collection = await this.getCollection();
        const logEntry = {
            level,
            message,
            timestamp: new Date(),
        };
        await collection.insertOne(logEntry);
    }
}

export default MongoLogger;
