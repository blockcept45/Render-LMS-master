"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const Joi = require("@hapi/joi");
const fs = require("fs");
let ConfigService = ConfigService_1 = class ConfigService {
    constructor(configService, filePath) {
        this.configService = configService;
        const config = (0, dotenv_1.parse)(fs.readFileSync(filePath));
        this.envConfig = ConfigService_1.validateInput(config);
    }
    static validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            APP_ENV: Joi.string().valid('dev', 'prod').default('dev'),
            APP_URL: Joi.string().uri({
                scheme: [/https?/],
            }),
            WEBTOKEN_SECRET_KEY: Joi.string().required(),
            WEBTOKEN_EXPIRATION_TIME: Joi.number().default(1800),
            DB_URL: Joi.string().regex(/^mongodb/),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get(key) {
        return this.envConfig[key];
    }
    isEnv(env) {
        return this.envConfig.APP_ENV === env;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = ConfigService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, String])
], ConfigService);
//# sourceMappingURL=config.service.js.map