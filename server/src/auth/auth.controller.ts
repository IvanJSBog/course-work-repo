import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from '../user/user.service';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  // временный метод для тестирования гвардов
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.REGULAR)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    return this.userService.findUserById(req.user.id);
  }
}
