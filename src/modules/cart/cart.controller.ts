import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddProductDto, RemoveProductDto } from './cart.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
@UseInterceptors(ClassSerializerInterceptor)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  getCart(@Request() req: any) {
    const userId = req?.user?.id || null;
    return this.cartService.findCartByUserId(userId);
  }

  @Post('/add-product')
  addProduct(@Body() body: AddProductDto, @Request() req: any) {
    const userId = req?.user?.id || null;
    const { productId, quantity } = body;
    return this.cartService.addProduct(productId, quantity, userId);
  }

  @Post('/remove-product')
  removeProduct(@Body() body: RemoveProductDto, @Request() req: any) {
    const userId = req?.user?.id || null;
    const { productId, quantity } = body;
    return this.cartService.removeProduct(productId, quantity, userId);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Delete('/')
  //   async deleteCart(@Request() req: any) {
  //     const cart = await this.cartService.deleteCart(userId);
  //     if (!cart) throw new NotFoundException('Cart does not exist');
  //     return cart;
  //   }
}
