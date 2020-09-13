import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from './infrastructure/config/config.service';
import { ResponseTransformInterceptor } from './infrastructure/interceptors/response-transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    app.useGlobalInterceptors(new ResponseTransformInterceptor());

    app.setGlobalPrefix('api/v1/');

    const options = new DocumentBuilder()
    .setTitle('snapshots of bike stations')
    .setDescription('RESTful API to handle snapshots of bike stations')
    .setVersion('1.0')
    .addTag('Bike Stations')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'AbCdEf123456')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(process.env.PORT || config.getNumber('APP_PORT'));
}

bootstrap();
