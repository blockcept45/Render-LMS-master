import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  filename: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
