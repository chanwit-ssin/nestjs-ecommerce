import { Body, ClassSerializerInterceptor, Controller, Get, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './user.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  getUserId(@Request() req: any): Promise<UserDto> {
    return this.userService.findById(req.user.id);
  }

  @Put('/update-profile')
  uodateProfile(@Body() body: UpdateUserDto, @Request() req: any): Promise<UserDto> {
    const userId = req.user.id;
    return this.userService.update(userId, body);
  }
}
