import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IEnvironment } from './common/configration/environment.interface';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<IEnvironment>);

  const PORT = configService.getOrThrow<number>('port');
  await app.listen(PORT);
  Logger.log(`Server is running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
