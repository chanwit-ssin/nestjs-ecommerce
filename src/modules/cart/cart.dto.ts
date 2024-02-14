import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;

  @ApiProperty()
  totalDiscount: number;
  @ApiProperty()
  totalPrice: number;
  //   @ApiProperty()
  //   cartProducts: CartProducT
}

export class AddProductDto {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  quantity: number;
}

export class RemoveProductDto {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  quantity: number;
}
