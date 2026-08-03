import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/data-access/dto/pagination.dto';

export class FindAllUnitsDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by unit title',
    example: 'apartment',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Filter by country MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'Filter by city MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsOptional()
  @IsString()
  city?: string;
}
