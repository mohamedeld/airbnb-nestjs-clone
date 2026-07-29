import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllCountriesDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  ignoreLimit?: boolean;
}
