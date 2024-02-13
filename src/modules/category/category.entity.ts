import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductCategory } from '../product-category/product-category.entity';

@Entity('category')
export class Category {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'name' })
  name: string;
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory: ProductCategory) => productCategory.product,
    { eager: true },
  )
  productCategories: ProductCategory[];
}
