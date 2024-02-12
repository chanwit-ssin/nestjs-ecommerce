import { Repository } from 'typeorm';
import { Product } from './product.entity';

export class ProductService {
  constructor(private readonly productRepository: Repository<Product>) {}

  findById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }
}
