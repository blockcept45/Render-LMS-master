import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService as NestConfigService } from '@nestjs/config';
import { ConfigService } from './config.service';

@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [
    {
      provide: ConfigService,
      useFactory: (configService: NestConfigService) => { 
        return new ConfigService(configService, '.env'); // Adjust the path as needed
      },
      inject: [NestConfigService],  
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
