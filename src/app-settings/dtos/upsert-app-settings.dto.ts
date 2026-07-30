import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpsertAppSettingDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(25)
  vatRate: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice: number;
}
