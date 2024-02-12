import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  getUserId(@Request() req: any) {
    console.log(req.user.id);
    return this.userService.findById(req.user.id);
  }

  @Get('/update-profile')
  uodateProfile(@Body() body: any, @Request() req: any) {
    return this.userService.create({ ...body });
  }
}
