import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, hashPassword } from 'src/common/utils/password.util';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await comparePassword(password, user?.password))) {
      const payload = {
        id: user?.id,
        email,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Please check your login credential.');
  }

  async register(dto: RegisterDto) {
    let user: any;
    user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      user = this.userRepository.save({
        ...dto,
        password: await hashPassword(dto.password),
      });

      const payload = {
        id: user.id,
        email: user.email,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Email Exist.');
  }
}
