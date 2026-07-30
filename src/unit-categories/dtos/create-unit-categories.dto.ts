import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUnitCategoriesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
