import { Injectable } from '@nestjs/common';
import { UnitFavoriteRepository } from '../repositories/unit-favorite.repositories';
import { FindUnitFavoritesDto } from '../dtos/find-unit-favorites.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { PipelineStage } from 'mongoose';
import { PaginatedResult } from 'src/common/data-access';
import { UnitFavoriteResponseDto } from '../dtos/unit-favorite-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindUnitFavoritesUseCase {
  constructor(
    private readonly unitFavoriteRepository: UnitFavoriteRepository,
  ) {}

  async execute(
    query: FindUnitFavoritesDto,
    currentUser: ICurrentUser,
  ): Promise<PaginatedResult<UnitFavoriteResponseDto>> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          user: currentUser._id.toString(),
        },
      },
      {
        $addFields: {
          unitObjectId: {
            $toObjectId: '$unit',
          },
        },
      },
      {
        $lookup: {
          from: 'units',
          localField: 'unitObjectId',
          foreignField: '_id',
          as: 'unit',
        },
      },
      {
        $unwind: '$unit',
      },
      {
        $match: {
          'unit.isDeleted': { $ne: true },
          'unit.isActive': { $ne: false },
        },
      },
      {
        $replaceRoot: {
          newRoot: '$unit',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          costPerDay: 1,
          photos: 1,
        },
      },
    ];
    const result =
      await this.unitFavoriteRepository.paginatedAggregation<UnitFavoriteResponseDto>(
        pipeline,
        {
          page: query?.page,
          limit: query?.limit,
          ignoreLimit: query?.ignoreLimit,
        },
      );

    return plainToInstance(PaginatedResult<UnitFavoriteResponseDto>, result);
  }
}
