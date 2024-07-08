import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  user: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
