import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createValidationFactory } from 'src/common/files/files-validation-factory';

type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      createValidationFactory({
        maxSize: 1024 * 1024 * 2,
        fileType: 'image/jpeg|image/png|image/jpg',
      }),
    )
    file: File,
  ) {
    return file;
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles(
      createValidationFactory({
        maxSize: 1024 * 1024 * 2,
        fileType: 'image/jpeg|image/png|image/jpg',
      }),
    )
    files: Array<File>,
  ) {
    return files;
  }
}
