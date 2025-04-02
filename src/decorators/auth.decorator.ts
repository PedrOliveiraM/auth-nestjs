import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from 'src/infra/provides/auth-provider.guard'
import { RolesGuard } from 'src/infra/provides/roles-provider.guard'

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard)
  )
}
