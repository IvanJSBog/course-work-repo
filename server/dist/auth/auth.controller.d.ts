import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signUp(dto: RegisterDto, res: any): Promise<{
        accessToken: string;
    }>;
    signIn(dto: LoginDto, res: any): Promise<{
        accessToken: string;
    }>;
    logout(res: any): Promise<void>;
    refresh(req: any): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): Promise<any>;
}
