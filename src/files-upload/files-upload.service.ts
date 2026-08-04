import { Injectable } from '@nestjs/common';
import { UploadSingleFileUseCase } from './usecases/upload-single-file.usecase';
import { UploadMultipleFilesUseCase } from './usecases/upload-multiple-files.usecases';
import { DeleteFileByUrlUseCase } from './usecases/delete-file-by-url.usecase';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
    private readonly uploadMultipleFilesUseCase: UploadMultipleFilesUseCase,
    private readonly deleteFileByUrlUseCase: DeleteFileByUrlUseCase,
  ) {}

  uploadSingleFile(file: Express.Multer.File) {}

  uploadMultipleFiles(files: Express.Multer.File[]) {}

  deleteFileByUrl(url: string) {}
}
