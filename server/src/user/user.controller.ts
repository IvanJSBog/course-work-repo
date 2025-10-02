import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async getUsers(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Post()
  public async createUser(@Body() createUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
