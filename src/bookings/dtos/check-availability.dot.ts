import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CheckAvailabilityDto {
  @IsMongoId()
  unit: string;

  @IsNotEmpty()
  checkIn: number | Date;

  @IsNotEmpty()
  checkOut: number | Date;

  @IsOptional()
  adultsCount?: number;

  @IsOptional()
  kidsCount?: number;
}
