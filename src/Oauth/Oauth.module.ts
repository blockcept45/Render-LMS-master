import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { GoogleModule } from '../OauthUser/google.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    GoogleModule,
  ],
  providers: [GoogleStrategy],
})
export class OauthModule {}
