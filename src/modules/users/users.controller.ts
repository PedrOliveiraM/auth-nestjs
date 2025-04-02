import { UpdateUserAddRoleUseCase } from './use-cases/update-add-role-user.usecase'
import { Body, Controller, Post, Put, Request, UseGuards } from '@nestjs/common'
import { UserCreateDto, UserUpdateAddRoleDto } from './schema/user.dto'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { AuthGuard } from 'src/infra/provides/auth-provider.guard'

@Controller('users')
export class UsersController {
  constructor(
    private readonly CreateUserUseCase: CreateUserUseCase,
    private readonly UpdateUserAddRoleUseCase: UpdateUserAddRoleUseCase
  ) {}

  @Post('/')
  async createUser(@Body() data: UserCreateDto) {
    const res = await this.CreateUserUseCase.execute(data)
    return res
  }

  @UseGuards(AuthGuard)
  @Put('/update-role')
  async updateUserAddRole(
    @Request() request,
    @Body() data: UserUpdateAddRoleDto
  ) {
    const res = await this.UpdateUserAddRoleUseCase.execute({
      _id: request.user.sub,
      roles: data.roles,
    })
    return res
  }
}
