import {
  HttpStatus,
  ParseFilePipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IValidationFactory } from './validators/file-validator.interface';
import { createFileValidator } from './validators/create-file-validator';

export const createValidationFactory = ({
  fileType,
  maxSize,
}: IValidationFactory): ParseFilePipe => {
  return new ParseFilePipe({
    validators: createFileValidator({ maxSize, fileType }),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error: string) => {
      throw new UnprocessableEntityException(error);
    },
  });
};
