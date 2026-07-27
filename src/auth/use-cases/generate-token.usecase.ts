import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}
  async execute(userId: string) {
    const payload = { sub: userId };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      {
        userId,
        type: 'refresh',
      },
      {
        expiresIn: this.configService.getOrThrow('refreshTokenExpiration'),
      },
    );
    const handleRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { refreshToken: handleRefreshToken },
      { returnDocument: 'after', upsert: true },
    );
    return { accessToken, refreshToken };
  }
}
