import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { ForgetPasswordRepository } from '../repositories/forget-password.repository';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class ResetForgetPasswordUseCase {
  private logger = new Logger(ResetForgetPasswordUseCase.name);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly forgetPasswordRepository: ForgetPasswordRepository,
    private readonly usersService: UsersService,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(body: ResetPasswordDto): Promise<void> {
    const forgetPassword = await this.forgetPasswordRepository.findOne({
      email: body.email,
    });
    if (!forgetPassword) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.INVALID_EMAIL'),
      );
    }
    if (!forgetPassword.isVerified) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.OTP_NOT_VERIFIED'),
      );
    }
    const session = await this.connection.startSession();
    try {
      await session?.withTransaction(async () => {
        const hashedPassword = await bcrypt.hash(body.newPassword, 10);
        await this.usersService.updateUserRaw(
          { email: body.email },
          { password: hashedPassword },
          session,
        );
        // delete forget password document
        await this.forgetPasswordRepository.findOneAndDelete(
          {
            email: body.email,
          },
          { session },
        );
      });
    } catch (e) {
      this.logger.error('Failed to reset password', e);
      throw new BadRequestException(
        this.customI18nService.translate('validation.FAILED_RESET_PASSWORD'),
      );
    } finally {
      await session.endSession();
    }
  }
}
