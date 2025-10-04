import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    getStoreById(id: string, req: any): Promise<any>;
    createStore(dto: CreateStoreDto, req: any): Promise<any>;
}
