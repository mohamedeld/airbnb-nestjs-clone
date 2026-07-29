import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/data-access/dto/pagination.dto';

export class FindAllCitiesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  country: string;
}
