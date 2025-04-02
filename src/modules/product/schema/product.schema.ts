import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Product {
  @Prop()
  code: string

  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  price: number

  @Prop()
  quantity: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
