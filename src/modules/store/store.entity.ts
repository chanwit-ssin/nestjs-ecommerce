import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('store')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => Product,
    (product: Product) => product.store,
    { eager: true },
  )
  products: Product[];
}
