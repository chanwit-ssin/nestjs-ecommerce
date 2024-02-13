import { Body, Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CartService } from './cart.service';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  getCart(@Request() req: any) {
    const userId = req?.user?.id || null;
    // return this.cartService.getCart(req.user.id);
  }

  @Post('/add-product')
  addProduct(@Request() req: any) {
    const userId = req?.user?.id || null;
    // return this.cartService.addProduct(req.user.id);
  }

  @Post('/remove-product')
  removeProduct(@Request() req: any) {
    const userId = req?.user?.id || null;
    // return this.cartService.getCart(req.user.id);
  }

//   @UseGuards(JwtAuthGuard)
//   @Delete('/')
//   async deleteCart(@Request() req: any) {
//     const cart = await this.cartService.deleteCart(userId);
//     if (!cart) throw new NotFoundException('Cart does not exist');
//     return cart;
//   }
}
