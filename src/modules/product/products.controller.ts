import { CreateProductDto } from './schema/create-product.dto'
import { CreateProductUseCase } from './use-cases/create-product.usecase'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('')
  async createProduct(@Body() data: CreateProductDto) {
    console.log('data', data)
    const res = await this.createProductUseCase.execute(data)
    return res
  }
}
