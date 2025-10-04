import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    getStoreById(id: string, req: any): Promise<any>;
    createStore(dto: CreateStoreDto, req: any): Promise<any>;
    updateStore(dto: UpdateStoreDto, req: any, storeId: string): Promise<any>;
    deleteStore(req: any, storeId: string): Promise<any>;
}
