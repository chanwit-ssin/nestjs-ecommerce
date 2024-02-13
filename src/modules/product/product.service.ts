import { Repository } from 'typeorm';
import { Product } from './product.entity';

export class ProductService {
  constructor(private readonly productRepository: Repository<Product>) {}

  find(id: string, filter?: any) {
    return this.productRepository.findOne({ where: { id } });
  }

  findById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  findByStoreId(storeId: string) {
    return this.productRepository.find({ where: { storeId } });
  }
}
