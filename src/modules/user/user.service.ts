import { Repository } from 'typeorm';
import { User } from './user.entity';

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  create({}) {}
  update({}) {}
}
