import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AdminModule } from './admin/admin.module';
import { OauthModule } from './Oauth/Oauth.module';
import { GoogleModule } from './OauthUser/google.module';
import { VideoModule } from './video/video.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global
    }),
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
  }]),
    VideoModule,
    OauthModule,
    GoogleModule,
    UserModule,
    CourseModule,
    AdminModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI'); 
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
