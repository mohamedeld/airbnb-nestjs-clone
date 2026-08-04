import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import bytes from 'bytes';
import { Readable } from 'stream';

import { IEnvironment } from 'src/common/configration/environment.interface';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

type File = Express.Multer.File;

@Injectable()
export class S3FileStorageService {
  private readonly s3Client: S3;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly minioEndpoint: string;

  constructor(
    private readonly configService: ConfigService<IEnvironment>,
    private readonly custom18nService: CustomI18nService,
  ) {
    this.bucketName = this.configService.getOrThrow('bucketName');
    this.region = this.configService.getOrThrow('region');
    this.accessKeyId = this.configService.getOrThrow('awsAccessKeyId');
    this.secretAccessKey = this.configService.getOrThrow('awsSecretAccessKey');
    this.minioEndpoint = this.configService.getOrThrow('minioEndpoint');

    this.s3Client = new S3({
      endpoint: this.minioEndpoint,
      forcePathStyle: Boolean(this.minioEndpoint),
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async uploadSingleFile(file: Express.Multer.File) {
    const uniqueFileName = this.generateFileName(file);

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: uniqueFileName,
        Body: Readable.from(file.buffer),
        ContentType: file.mimetype,
      },
      // upload up to 4 parts in parallel
      queueSize: 4,
      // min part size = 5  MB
      partSize: bytes('5MB') as number,
    });
    upload.on('httpUploadProgress', (progress) => {
      console.log('progress', progress);
    });
    try {
      const result = await upload.done();
      return result.Location as string;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        this.custom18nService.translate('validation.FAILED_UPLOAD'),
      );
    }
  }

  async deleteFileByUrl(url: string | string[]): Promise<void> {
    const urls = Array.isArray(url) ? url : [url];
    if (urls?.length === 0) return;
    try {
      const keys = urls?.map((item) => {
        const urlObj = new URL(item);
        const pathname = urlObj?.pathname;
        const bucketPrefix = `/${this.bucketName}/`;
        return pathname.startsWith(bucketPrefix)
          ? pathname.slice(bucketPrefix.length)
          : pathname.slice(1);
      });
      await this.s3Client.deleteObjects({
        Bucket: this.bucketName,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        this.custom18nService.translate('validation.FAILED_DELETE'),
      );
    }
  }

  private generateFileName(file: File): string {
    const fileName = `${Date.now()}-${file.originalname ?? file.filename}`;
    return fileName;
  }
}
