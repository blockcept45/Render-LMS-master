
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { SuperAdminLocalStrategy } from './strategies/superadmin-local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('WEBTOKEN_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('WEBTOKEN_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, AdminLocalStrategy, SuperAdminLocalStrategy, JwtStrategy ],
  exports: [AuthService],
})
export class AuthModule {}
