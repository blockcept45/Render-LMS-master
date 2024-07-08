// src/auth/OauthUser/user.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  oauthId: string; // Ensure oauthId is unique and required

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  picture: string;

  @Prop({ required: true })
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop()
  provider: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
