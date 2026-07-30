import { Injectable } from '@nestjs/common';
import { SystemAdminRepository } from '../repositories/system-admin.repositories';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { SystemAdminLResponseDto } from '../dtos/system-admin-reponse.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { QueryFilter } from 'mongoose';
import { SystemAdmin } from '../schema/system-admin.schema';

@Injectable()
export class FindOneSystemAdminUseCase {
  constructor(
    private readonly systemAdminRepository: SystemAdminRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminLResponseDto> {
    const systemAdmin = await this.systemAdminRepository.findOne(query);
    if (!systemAdmin) {
      throw new BadRequestException(
        this.customI18n.translate(
          'validation.INVALID_SYSTEM_ADMIN_CREDENTIALS',
        ),
      );
    }
    return systemAdmin;
  }
}
