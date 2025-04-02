import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { compare } from 'bcrypt'
import { Model } from 'mongoose'
import { User } from '../users/schema/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async login(username: string, password: string) {
    if (!username || !password)
      throw new BadRequestException('Username and password are required')

    const user = await this.userModel.findOne({ username }).exec()

    if (!user) throw new UnauthorizedException()

    const isEqualsPassword = await compare(password, user.password)

    if (!isEqualsPassword) throw new UnauthorizedException()

    const payload = {
      sub: user._id,
      user: {
        id: user.id,
        name: user.name,
        roles: user.roles,
        username: user.username,
      },
    }

    const token = await this.jwtService.signAsync(payload)

    return { access_token: token }
  }
}
