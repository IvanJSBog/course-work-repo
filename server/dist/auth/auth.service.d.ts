import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    logIn(): Promise<void>;
    logOut(): Promise<void>;
}
