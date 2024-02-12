import { Column, Entity } from 'typeorm';

@Entity('product')
export class Product {
  @Column({ name: 'id', type: 'uuid' })
  id: string;
  @Column({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'price', default: '0', type: 'decimal'})
  price: bigint;
}
