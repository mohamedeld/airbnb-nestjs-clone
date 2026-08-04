import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUnitPhotosDto {
  @ApiProperty({
    description: 'Photo URLs to delete from the unit',
    type: [String],
    example: ['https://example.com/unit-photo.jpg'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  photos: string[];
}
