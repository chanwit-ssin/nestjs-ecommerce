import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  getUserId(@Request() req: any) {
    return this.userService.findById(req.user.id);
  }

  @Put('/update-profile')
  uodateProfile(@Body() body: any, @Request() req: any) {
    const userId = req.user.id;
    return this.userService.update(userId, body);
  }
}
