import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductCategory } from '../product-category/product-category.entity';
import { Store } from '../store/store.entity';

@Entity('product')
export class Product {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;
  @Column({ name: 'shop_id', type: 'uuid' })
  storeId: string;

  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'price', default: '0', type: 'decimal' })
  price: bigint;
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory: ProductCategory) => productCategory.product,
    { eager: true },
  )
  productCategories: ProductCategory[];
  @ManyToOne(
    () => Store,
    (store: Store) => store.products,
  )
  store: Store;
}
