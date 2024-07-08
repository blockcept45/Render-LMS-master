import { ConfigService as NestConfigService } from '@nestjs/config';
export interface EnvConfig {
    [key: string]: string;
}
export declare class ConfigService {
    private readonly configService;
    private readonly envConfig;
    constructor(configService: NestConfigService, filePath: string);
    private static validateInput;
    get(key: string): string;
    isEnv(env: string): boolean;
}
