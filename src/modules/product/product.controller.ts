import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/get-products')
  getProducts(@Body() body: any, @Request() req: any) {
    const userId = req?.user?.id || null;
    return this.productService.find(req.user.id);
  }

  @Get('/get-products-by-store-id')
  getProductsByStoreId(@Request() req: any) {
    return this.productService.findByStoreId(req.user.id);
  }
}
