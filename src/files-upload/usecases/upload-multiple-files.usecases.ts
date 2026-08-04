import { Injectable } from '@nestjs/common';
import { UploadSingleFileUseCase } from './upload-single-file.usecase';

@Injectable()
export class UploadMultipleFilesUseCase {
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}
  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(
      files.map((file) => this.uploadSingleFileUseCase.uploadFile(file)),
    );
  }
}
