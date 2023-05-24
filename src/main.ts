import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedirectMiddleware } from './middleware/Redirect.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(RedirectMiddleware);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('storycloud example')
    .setDescription('The storycloud API description')
    .setVersion('1.0')
    .addTag('post')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
