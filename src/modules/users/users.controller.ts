import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './schema/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('/')
  async createUser(@Body() data: UserCreateDto) {  
    const res = await this.usersService.create(data)
    return res;
  }
}
