"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle('Course work API')
        .setDescription('')
        .setVersion('1.0')
        .addTag('Course work API')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.use((0, cookie_parser_1.default)(configService.getOrThrow('COOKIE_SECRET')));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableCors({
        origin: configService.getOrThrow('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie'],
    });
    await app.listen(configService.getOrThrow('APPLICATION_PORT') ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map