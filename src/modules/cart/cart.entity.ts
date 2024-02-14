import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartProduct } from '../cart-product/cart-product.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'total_discount', default: 0 })
  totalDiscount: number;
  @Column({ name: 'total_price', default: 0 })
  totalPrice: number;

  // freebies:
  @OneToMany(
    () => CartProduct,
    (cartProduct: CartProduct) => cartProduct.cart,
    { eager: true },
  )
  cartProducts: CartProduct[];
}
