import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './product-category.entity';
// import { ProductCategoryController } from './product-category.controller';
// import { ProductCategoryService } from './product-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
//   controllers: [ProductCategoryController],
//   providers: [ProductCategoryService],
//   exports: [ProductCategoryService]
})
export class ProductCategoryModule {}
