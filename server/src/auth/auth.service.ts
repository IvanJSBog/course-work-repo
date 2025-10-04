import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: RegisterDto, res: Response) {
    const newUser = await this.userService.createUser(dto.email, dto.password);

    return this.generateTokens(newUser, res);
  }

  async signIn(dto: LoginDto, res: Response) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateTokens(user, res);
  }

  async logout(res: Response) {
    res.clearCookie('refresh_token');
  }

  async generateTokens(user: any, res: Response) {
    const payload = { id: user.id, role: user.role };

    // создаём access и refresh токены
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

    // записываем refresh в httpOnly cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,     // нельзя читать из JS
      secure: false,       // только https в проде
      sameSite: 'lax', // защита от CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    // возвращаем access токен клиенту
    return { accessToken };
  }

  async refresh(req: Request) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Проверяем, существует ли пользователь
    const user = await this.userService.findUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const newPayload = { id: user.id, role: user.role };

    const accessToken = await this.jwtService.signAsync(newPayload, { expiresIn: '15m' });

    return { accessToken };
  }
}
