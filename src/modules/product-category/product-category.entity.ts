import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Category } from '../category/category.entity';

@Entity('product-category')
export class ProductCategory {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;
  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;
  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Product, (product) => product.productCategories)
  product: Product;
  @ManyToOne(() => Category, (category) => category.productCategories)
  category: Category;
}
