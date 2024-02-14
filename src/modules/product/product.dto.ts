import { Exclude } from 'class-transformer';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  storeId: boolean;
}

export class CreateProductDto extends OmitType(ProductDto, ['id']) {}
export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: string;
}

export class FilterProductDto {
    categoriesId: string[];
}