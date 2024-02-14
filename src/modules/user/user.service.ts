import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(userId: string, dto: UpdateUserDto) {
    await this.userRepository.update(userId, { ...dto });
    return this.findById(userId);
  }
}
