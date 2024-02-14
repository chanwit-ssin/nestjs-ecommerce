import { Exclude } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  dob: Date;
  @ApiProperty({ required: false })
  gender: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ required: false })
  isSubscribe: boolean;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
