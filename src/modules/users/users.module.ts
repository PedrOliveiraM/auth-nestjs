import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schema'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { UsersController } from './users.controller'
import { UpdateUserAddRoleUseCase } from './use-cases/update-add-role-user.usecase'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [CreateUserUseCase, UpdateUserAddRoleUseCase],
})
export class UsersModule {}
