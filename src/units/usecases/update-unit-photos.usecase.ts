import { Injectable } from '@nestjs/common';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { UnitRepository } from '../repositories/unit.repository';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { plainToInstance } from 'class-transformer';
import { FindOneUnitUseCase } from './find-one-unit.usecase';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { UpdateUnitPhotosDto } from '../dtos/update-unit-photo.dto';
import { FilesUploadService } from 'src/files-upload/files-upload.service';

@Injectable()
export class UpdateUnitPhotosUsCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly findOneUseCase: FindOneUnitUseCase,
    private readonly filesUploadService: FilesUploadService,
  ) {}

  async execute(
    id: string,
    currentUser: ICurrentUser,
    photos: Express.Multer.File[],
  ): Promise<UnitResponseDto> {
    const body: UpdateUnitPhotosDto = {};
    const unit = await this.findOneUseCase.execute({ _id: id });

    this.checkUnitAuthUseCase.execute(currentUser, unit.user.toString());
    body.photos = await this.filesUploadService.uploadMultipleFiles(photos);

    const updatedUnit = await this.unitRepository.findByIdAndUpdate(
      id,
      { $addToSet: { photos: { $each: body.photos } } },
      { returnDocument: 'after', lean: true },
    );

    return plainToInstance(UnitResponseDto, updatedUnit);
  }
}
