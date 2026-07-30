import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { GenerateTokenUseCase } from './generate-token.usecase';

import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { ForbiddenException } from 'src/common/errors-handling/custom-exceptions/forbidden-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { Roles } from 'src/common/constants';

type RefreshTokenPayload = {
  userId: string;
  type: 'refresh';
};

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customI18n: CustomI18nService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly generateTokens: GenerateTokenUseCase,
  ) {}

  async execute(body: RefreshTokenDto) {
    let decodedToken: RefreshTokenPayload;

    // Verify JWT
    try {
      decodedToken = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        body.refreshToken,
      );
    } catch {
      throw new ForbiddenException(
        this.customI18n.translate('validation.INVALID_REFRESH_TOKEN'),
      );
    }

    // Ensure it's a refresh token
    if (decodedToken.type !== 'refresh') {
      throw new BadRequestException(
        this.customI18n.translate('validation.INVALID_REFRESH_TOKEN'),
      );
    }

    // Get stored hashed refresh token
    const storedToken = await this.refreshTokenModel.findOne({
      userId: decodedToken.userId,
    });

    if (!storedToken) {
      throw new BadRequestException(
        this.customI18n.translate('validation.INVALID_REFRESH_TOKEN'),
      );
    }

    // Compare provided token with stored hash
    const isTokenValid = await bcrypt.compare(
      body.refreshToken,
      storedToken.refreshToken,
    );

    if (!isTokenValid) {
      throw new BadRequestException(
        this.customI18n.translate('validation.INVALID_REFRESH_TOKEN'),
      );
    }

    // Rotate token
    return this.generateTokens.execute({
      id: storedToken.userId,
      role: Roles.USER,
    });
  }
}
