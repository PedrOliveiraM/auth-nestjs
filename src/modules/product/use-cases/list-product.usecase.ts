import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProductDto } from '../schema/create-product.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from '../schema/product.schema'

@Injectable()
export class ListProductUseCase {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async execute(): Promise<Product[]> {
    return this.productModel.find()
  }
}
