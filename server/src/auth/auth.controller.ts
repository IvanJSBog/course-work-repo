import { Controller, Post, Body, HttpStatus, HttpCode, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() dto: RegisterDto, @Res({passthrough: true}) res: any) {
    return this.authService.signUp(dto, res);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: LoginDto, @Res({passthrough: true}) res: any) {
    return this.authService.signIn(dto, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({passthrough: true}) res) {
    return this.authService.logout(res);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: any) {
    return this.authService.refresh(req);
  }
}
