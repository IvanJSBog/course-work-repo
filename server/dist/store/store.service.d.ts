import { DatabaseService } from '../database/database.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getById(storeId: string, userId: string): Promise<any>;
    createStore(userId: string, dto: CreateStoreDto): Promise<any>;
    updateStore(storeId: string, userId: string, dto: UpdateStoreDto): Promise<any>;
    deleteStore(storeId: string, userId: string): Promise<any>;
}
