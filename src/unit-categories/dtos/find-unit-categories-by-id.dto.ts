import { IsMongoId, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class FindUnitCategoriesByIdDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.REQUIRED_ID'),
  })
  @IsMongoId({ message: i18nValidationMessage('validation.INVALID_ID') })
  id: string;
}
