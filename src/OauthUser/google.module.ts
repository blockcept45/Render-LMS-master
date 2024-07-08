import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './google.schema';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ]
  ,
  providers: [GoogleService],
  controllers: [GoogleController],
  exports: [GoogleService], // Export UserService
})
export class GoogleModule {}
