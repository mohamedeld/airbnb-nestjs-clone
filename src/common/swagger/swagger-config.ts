import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Constants } from './constant';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Airbnb Clone API')
      .setDescription('The Airbnb Clone API description')
      .setVersion('1.0')
      .addTag(Constants.AUTH)
      .addTag(Constants.USERS)
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory, {
      swaggerOptions: {
        filter: true,
      },
    });
  }
}
