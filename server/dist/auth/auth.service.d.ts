import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    private readonly jwtService;
    constructor(userService: UserService, configService: ConfigService, jwtService: JwtService);
    signUp(dto: RegisterDto, res: Response): Promise<{
        accessToken: string;
    }>;
    signIn(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(res: Response): Promise<void>;
    generateTokens(user: any, res: Response): Promise<{
        accessToken: string;
    }>;
    refresh(req: Request): Promise<{
        accessToken: string;
    }>;
}
