import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User {
  @Column({ name: 'id', type: 'uuid' })
  id: string;

  @Column()
  email: string;
  @Exclude()
  @Column()
  password: string;
  @Column()
  name: string;
  @Column()
  dob: string;
  @Column()
  gender: string;
  @Column({ nullable: true })
  address: string;
  @Column({ default: false })
  isSubscribe: boolean;
}
