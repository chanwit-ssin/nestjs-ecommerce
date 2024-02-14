// import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
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
import { IsNull } from 'typeorm';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @Matches('[a-z0-9-]+')
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @Matches('[a-z0-9-]+')
  password: string;
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  dob: Date;
  @ApiProperty({ required: false })
  tel: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ default: false})
  isSubscribe: boolean;
}
