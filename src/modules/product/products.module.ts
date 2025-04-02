import { Module } from '@nestjs/common'
import { ProductController } from './products.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from './schema/product.schema'
import { CreateProductUseCase } from './use-cases/create-product.usecase'
import { RolesGuard } from 'src/infra/provides/roles-provider.guard'
import { ListProductUseCase } from './use-cases/list-product.usecase'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [CreateProductUseCase, ListProductUseCase],
})
export class ProductModule {}
