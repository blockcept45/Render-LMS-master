"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_API_CURRENT_VERSION = exports.SWAGGER_API_DESCRIPTION = exports.SWAGGER_API_NAME = exports.SWAGGER_API_ROOT = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const morgan = require("morgan");
exports.SWAGGER_API_ROOT = 'api/docs';
exports.SWAGGER_API_NAME = 'API';
exports.SWAGGER_API_DESCRIPTION = 'API Description';
exports.SWAGGER_API_CURRENT_VERSION = '1.0';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'));
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle(exports.SWAGGER_API_NAME)
        .setDescription(exports.SWAGGER_API_DESCRIPTION)
        .setVersion(exports.SWAGGER_API_CURRENT_VERSION)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(exports.SWAGGER_API_ROOT, app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(morgan('combined'));
    await app.listen(8080, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map