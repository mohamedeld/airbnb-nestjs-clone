import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { ForbiddenException } from 'src/common/errors-handling/custom-exceptions/forbidden-exception';

@Injectable()
export class CheckUnitAuthUseCase {
  constructor(private readonly customI18n: CustomI18nService) {}

  execute(user: ICurrentUser, unitId: string) {
    if (user?._id.toString() !== unitId) {
      throw new ForbiddenException(
        this.customI18n.translate('validation.UNIT_FORBIDDEN'),
      );
    }
  }
}
