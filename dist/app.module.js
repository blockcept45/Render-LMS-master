"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const user_module_1 = require("./user/user.module");
const course_module_1 = require("./course/course.module");
const admin_module_1 = require("./admin/admin.module");
const Oauth_module_1 = require("./Oauth/Oauth.module");
const google_module_1 = require("./OauthUser/google.module");
const video_module_1 = require("./video/video.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60,
                    limit: 10,
                }]),
            video_module_1.VideoModule,
            Oauth_module_1.OauthModule,
            google_module_1.GoogleModule,
            user_module_1.UserModule,
            course_module_1.CourseModule,
            admin_module_1.AdminModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const mongoUri = configService.get('MONGO_URI');
                    return {
                        uri: mongoUri,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map