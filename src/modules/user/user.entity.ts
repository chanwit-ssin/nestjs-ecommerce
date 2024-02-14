import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
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
