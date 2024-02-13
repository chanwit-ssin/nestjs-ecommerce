import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './user.dto';

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(userId: string, dto: UpdateUserDto) {
    return;
  }
}
