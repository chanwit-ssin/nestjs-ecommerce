// import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @Matches('[a-z0-9-]+')
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;
  @Matches('[a-z0-9-]+')
  password: string;
  @IsString()
  name: string;
  @IsDateString()
  dob: Date;
  @Length(10, 10)
  tel: string;
  @IsString()
  address: string;
  isSubscribe = false;
}
