import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column()
  email: string;
  @Exclude()
  @Column()
  password: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  dob: Date;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  address: string;
  @Column({ default: false })
  isSubscribe: boolean;
}
