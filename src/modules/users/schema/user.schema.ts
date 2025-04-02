import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
  @Prop()
  id: string

  @Prop()
  name: string

  @Prop()
  password: string

  @Prop()
  username: string

  @Prop()
  roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
