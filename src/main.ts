import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NoContentToNotFoundInterceptor } from './common/interseptors/NoContentToNotFoundInterseptor.interseptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { rabbitMQConfig } from './common/config/rabbitmq.config';
import { CustomExceptionFilter } from './common/filters/exception-filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('FRONT_URL'),
  });
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector, {
      excludeExtraneousValues: true,
    }),
    new NoContentToNotFoundInterceptor(),
  );

  const port = configService.get<string>('PORT') || '3000';
  const url =
    configService.get<string>('BASE_URL') || 'http://localhost:' + port;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addServer(url)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.connectMicroservice(rabbitMQConfig());

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
