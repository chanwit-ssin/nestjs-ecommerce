import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Cart } from '../cart/cart.entity';

@Entity('cart-product')
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;
  @Column({ name: 'cart_id', type: 'uuid' })
  cartId: string;

  @Column({ name: 'quantity', default: 1 })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productCategories)
  product: Product;
  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  cart: Cart;
}
