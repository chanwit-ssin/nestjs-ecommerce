import { Exclude } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UserDto {
  id: string;
  email: string;
  @Exclude()
  password: string;
  name: string;
  dob: Date;
  gender: string;
  address: string;
  isSubscribe: boolean;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
}
