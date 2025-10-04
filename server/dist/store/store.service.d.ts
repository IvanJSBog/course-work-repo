import { DatabaseService } from '../database/database.service';
export declare class StoreService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getById(storeId: string, userId: string): Promise<any>;
}
