import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { FindOneUnitUseCase } from './find-one-unit.usecase';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

@Injectable()
export class DeleteUnitPhotosUseCase {
  constructor(
    private readonly unitsRepository: UnitRepository,
    private readonly filesUploadService: FilesUploadService,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly findOneUseCase: FindOneUnitUseCase,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(
    id: string,
    user: ICurrentUser,
    photos: string[],
  ): Promise<void> {
    const unit = await this.findOneUseCase.execute({ _id: id });
    if (!unit) {
      throw new Error(
        this.customI18nService.translate('validation.UNIT_NOT_FOUND'),
      );
    }
    this.checkUnitAuthUseCase.execute(user, unit.user.toString());
    if (photos?.length === 0) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.IMAGE_NOT_PROVIDED'),
      );
    }

    const imagesToDelete = photos?.filter((photo) =>
      unit.photos.includes(photo),
    );

    await this.unitsRepository.findByIdAndUpdate(
      id,
      { $pull: { photos: { $in: imagesToDelete } } },
      { returnDocument: 'after' },
    );
    await this.filesUploadService.deleteFileByUrl(imagesToDelete);
  }
}
