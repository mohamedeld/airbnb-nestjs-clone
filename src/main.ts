import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';
import { IEnvironment } from './common/configration/environment.interface';
import { SwaggerConfig } from './common/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: process.env.NODE_ENV === 'production',
    }),
  });

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // app.useGlobalFilters(
  //   new I18nValidationExceptionFilter({
  //     detailedErrors: false,
  //   }),
  // );

  const configService = app.get(ConfigService<IEnvironment>);

  // swagger setup
  SwaggerConfig.setup(app);

  const PORT = configService.getOrThrow<number>('port');
  await app.listen(PORT);
  Logger.log(`Server is running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
