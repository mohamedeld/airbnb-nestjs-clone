import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import filetype from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }
  isValid(file?: IFile): boolean | Promise<boolean> {
    if (!file?.buffer) {
      return false;
    }
    const fileSignature = filetype(file?.buffer)?.map((file) => file.mime);
    if (fileSignature?.length === 0) return false;

    const isMatch = fileSignature?.includes(file?.mimetype);
    if (!isMatch) return false;
    return true;
  }
  buildErrorMessage(): string {
    return '';
  }
}
