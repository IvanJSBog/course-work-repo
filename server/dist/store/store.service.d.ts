import { DatabaseService } from '../database/database.service';
import { CreateStoreDto } from './dto/create-store.dto';
export declare class StoreService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getById(storeId: string, userId: string): Promise<any>;
    createStore(userId: string, dto: CreateStoreDto): Promise<any>;
}
