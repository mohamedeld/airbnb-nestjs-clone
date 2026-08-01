import { Module } from '@nestjs/common';
import { FilesUploadController } from './files-upload.controller';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Module({
  controllers: [FilesUploadController],
  providers: [CustomI18nService],
})
export class FilesUploadModule {}
