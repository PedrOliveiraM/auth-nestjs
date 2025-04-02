import { Role, Roles } from 'src/decorators/roles.decorator'
import { CreateProductDto } from './schema/create-product.dto'
import { CreateProductUseCase } from './use-cases/create-product.usecase'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/infra/provides/auth-provider.guard'

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('')
  @Roles(Role.ADMIN)
  async createProduct(@Body() data: CreateProductDto) {
    const res = await this.createProductUseCase.execute(data)
    return res
  }
}
