import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../schema/user.schema'
import { UnauthorizedException } from '@nestjs/common'
import { UserUpdateAddRoleDto } from '../schema/user.dto'

export class UpdateUserAddRoleUseCase {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(data: UserUpdateAddRoleDto) {
    const user = await this.userModel.findById(data._id).exec()

    if (!user) throw new UnauthorizedException()

    const userUpdated = await this.userModel
      .findByIdAndUpdate(data._id, {
        roles: data.roles,
      })
      .exec()

    if (!userUpdated) throw new UnauthorizedException()

    return userUpdated
  }
}
