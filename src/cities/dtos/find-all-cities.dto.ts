import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllCitiesDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  country: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  ignoreLimit?: boolean;
}
