import { Body, ClassSerializerInterceptor, Controller, Get, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product')
@ApiTags('product')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  getProducts(@Query() query: any, @Request() req: any) {
    const userId = req?.user?.id || null;
    return this.productService.find(userId);
  }

  @Get('/get-products-by-store-id')
  getProductsByStoreId(@Request() req: any) {
    const userId = req?.user?.id || null;
    return this.productService.findByStoreId(userId);
  }
}
