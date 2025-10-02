import { DatabaseService } from '../database/database.service';
export declare class UserService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findUserById(id: string): Promise<any>;
    findUserByEmail(email: string): Promise<any>;
    createUser(dto: any): Promise<any>;
}
