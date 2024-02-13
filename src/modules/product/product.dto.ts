import { Exclude } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/swagger';

export class ProductDto {
  id: string;
  name: string;
  storeId: boolean;
}

export class CreateProductDto extends OmitType(ProductDto, ['id']) {}
export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: string;
}

export class FilterProductDto {
    categoriesId: string[];
}