import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  user: string;

  @Prop()
  status: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
