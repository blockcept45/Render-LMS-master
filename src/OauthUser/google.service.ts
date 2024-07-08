// src/user/google.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './google.schema';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GoogleService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findByOauthId(oauthId: string): Promise<User | null> {
    return this.userModel.findOne({ oauthId }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findOrCreateUser(userData: Partial<User>): Promise<User> {
    let user = await this.findByOauthId(userData.oauthId);
    if (!user) {
      user = await this.create(userData);
    } else {
      user.accessToken = userData.accessToken;
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.picture = userData.picture;
      await user.save();
    }
    return user;
  }

  // Add the JWT generation method
  generateJwt(user: User): string {
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    // Replace 'your_secret_key' with a secure key from your environment variables
    return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
  }
}
