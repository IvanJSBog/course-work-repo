import { StoreService } from './store.service';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    getStoreById(id: string, req: any): Promise<any>;
}
