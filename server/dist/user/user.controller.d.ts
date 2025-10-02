import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(id: string): Promise<any>;
    createUser(createUserDto: any): Promise<any>;
}
