import { Module } from '@nestjs/common';
import { FilesUploadController } from './files-upload.controller';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { DeleteFileByUrlUseCase } from './usecases/delete-file-by-url.usecase';
import { UploadMultipleFilesUseCase } from './usecases/upload-multiple-files.usecases';
import { UploadSingleFileUseCase } from './usecases/upload-single-file.usecase';
import { FilesUploadService } from './files-upload.service';

@Module({
  controllers: [FilesUploadController],
  providers: [
    CustomI18nService,
    DeleteFileByUrlUseCase,
    UploadSingleFileUseCase,
    UploadMultipleFilesUseCase,
    FilesUploadService,
  ],
  exports: [FilesUploadService],
})
export class FilesUploadModule {}
