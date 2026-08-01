import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import { IValidationFactory } from './file-validator.interface';
import { FileSignatureValidator } from './file-signature.validator';

export const createFileValidator = ({
  fileType,
  maxSize,
}: IValidationFactory):
  FileValidator<Record<string, any>, IFile>[] | undefined => {
  return [
    new MaxFileSizeValidator({
      maxSize: maxSize,
      message: `File size exceeds the maximum limit of 2mb`,
    }),
    new FileTypeValidator({ fileType: fileType }),
    new FileSignatureValidator(),
  ];
};
