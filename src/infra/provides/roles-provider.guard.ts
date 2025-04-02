import { JwtService } from '@nestjs/jwt'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY, Role } from 'src/decorators/roles.decorator'
import { Request } from 'express'
import { env } from 'src/env'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private JwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException('Token not found or invalid')

    try {
      const payload = await this.JwtService.verifyAsync(token, {
        secret: env.JWT_SECRET,
      })
      request.user = payload
      return requiredRoles.some(role => payload.user.roles.includes(role))
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
