import { Body, Controller, Get, Post } from '@nestjs/common'
import { Role, Roles } from 'src/decorators/roles.decorator'
import { CreateProductDto } from './schema/create-product.dto'
import { CreateProductUseCase } from './use-cases/create-product.usecase'
import { ListProductUseCase } from './use-cases/list-product.usecase'

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductUseCase: ListProductUseCase
  ) {}

  @Post('')
  @Roles(Role.ADMIN)
  async createProduct(@Body() data: CreateProductDto) {
    const res = await this.createProductUseCase.execute(data)
    return res
  }

  @Get('')
  @Roles(Role.ADMIN, Role.USER)
  async listProducts() {
    const res = await this.listProductUseCase.execute()
    return res
  }
}
