import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProductDto } from '../schema/create-product.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from '../schema/product.schema'

@Injectable()
export class CreateProductUseCase {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async execute(data: CreateProductDto): Promise<Product> {
    const productExisted = await this.productModel
      .findOne({ code: data.code })
      .exec()

    if (productExisted)
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST)

    const productCreated = new this.productModel(data)
    await productCreated.save()

    return productCreated
  }
}
