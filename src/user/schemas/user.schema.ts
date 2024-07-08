import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone?: string;

  @Prop()
  picture: string;

  @Prop()
  accessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
