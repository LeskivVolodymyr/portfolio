import { Collection, MongoClient, ServerApiVersion, Document } from 'mongodb';

class MongoService {
    private readonly client: MongoClient;
    private readonly clientPromise: Promise<MongoClient>;
    private readonly db: string;
    private readonly defaultCollection: string;

    constructor() {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('Can not find MONGODB_URI');

        const db = process.env.MONGODB_DB;
        if (!db) throw new Error('Can not find MONGODB_DB');

        this.db = db;
        this.defaultCollection = 'ContactRequests';

        const options = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        };

        this.client = new MongoClient(uri, options);
        this.clientPromise = this.client.connect();
    }

    async getCollection<T extends Document>(
        collectionName: string = this.defaultCollection
    ): Promise<Collection<T>> {
        try {
            const client = await this.clientPromise;
            return client.db(this.db).collection<T>(collectionName);
        } catch (error) {
            console.error('Failed to get collection:', error);
            throw error;
        }
    }
}

export default MongoService;
