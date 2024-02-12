import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { JwtService } from './jwt.service';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validate(token: string) {
    const decoded = await this.jwtService.verify(token);
    if (!decoded) throw new UnauthorizedException('Invalid Token!');

    const auth = decoded?.id
      ? await this.userService.findById(decoded?.id)
      : null;
    if (!auth) throw new ConflictException('User not found!');

    return decoded.id;
  }

  async register({
    email,
    password,
    name,
    dob,
    gender,
    address,
    isSubscribe,
  }: UserDto) {
    // await this.userService.(decoded?.id)
  }

  async login(email: string, password: string) {}
  async changePassword(email: string, password: string) {}
}
