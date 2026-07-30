import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/data-access/dto/pagination.dto';
import { Exclude, Expose } from 'class-transformer';
import { Roles } from 'src/common/constants/roles.constant';

export class SystemAdminLResponseDto extends PaginationDto {
  @IsNotEmpty()
  @Expose({ name: '_id' })
  id: string;

  @ApiProperty({
    description: 'System admin name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsEmail()
  name: string;

  @ApiProperty({
    description: 'System admin email',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'System admin password',
    example: 'securepassword123',
  })
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isSuperAdmin: boolean;

  @IsNotEmpty()
  role: (typeof Roles)[keyof typeof Roles];

  @Exclude()
  isDeleted: boolean;
}
