import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/data-access/dto/pagination.dto';

export class FindAllCountriesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  countryCode: string;
}
