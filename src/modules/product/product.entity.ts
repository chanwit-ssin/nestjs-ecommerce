import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from '../product-category/product-category.entity';
import { Store } from '../store/store.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'store_id', type: 'uuid' })
  storeId: string;

  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'price', default: '0', type: 'decimal' })
  price: number;
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory: ProductCategory) => productCategory.product,
    { eager: true },
  )
  productCategories: ProductCategory[];
  @ManyToOne(() => Store, (store: Store) => store.products)
  store: Store;
}
