import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('store')
export class Store {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
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
