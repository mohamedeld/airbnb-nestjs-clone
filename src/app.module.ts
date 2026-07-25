import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchema } from './common/configration/env-schema.validation';
import configMapping from './common/configration/configMapping';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
