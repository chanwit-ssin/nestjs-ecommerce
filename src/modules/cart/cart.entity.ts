import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'total_discount' })
  totalDiscount: number;
  @Column({ name: 'total_price' })
  totalPrice: number;

  // freebies:
}
