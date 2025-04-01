import { randomUUID } from 'node:crypto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hash } from 'bcrypt'
import { Model } from 'mongoose'
import { UserCreateDto } from './schema/user.dto'
import { User } from './schema/user.schema'
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: UserCreateDto) {
    const userExisted = await this.userModel
      .findOne({ username: userDto.username })
      .exec()

    if (userExisted)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)

    const password = await hash(userDto.password, 10)

    const userCreated = new this.userModel({
      ...userDto,
      id: randomUUID(),
      password,
    })

    const user = await userCreated.save()
    console.log({ user })
    return user
  }
}
