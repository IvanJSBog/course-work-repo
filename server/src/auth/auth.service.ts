import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }
  async signIn(dto: RegisterDto){

  }

  async logIn(){

  }

  async logOut(){

  }
}
