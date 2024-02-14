import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  find(id: string, filter?: any) {
    return this.productRepository.find({ where: { } });
  }

  findById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  findByStoreId(storeId: string) {
    return this.productRepository.find({ where: { storeId } });
  }
}
