import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitPhotosDto {
  @ApiProperty({
    description: 'Photo URLs to update for the unit',
    type: [String],
    example: ['https://example.com/unit-photo.jpg'],
  })
  
  photos?: string[];
}
