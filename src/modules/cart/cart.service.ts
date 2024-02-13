import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

export class CartService {
  constructor(private readonly cartRepository: Repository<Cart>) {}

  // findByUserId(userId: string) {
  //   return; // cart;
  // }

  createCart(customerId: string) {
    return;
  }

  addProduct(productId: string, quantity: number) {
    return;
  }

  removeProduct(cartId: string, productId: string) {
    return;
  }
  hasProducts(productId: string) {
    return true; // boolean
  }
  isEmpty() {
    return; // boolean
  }
  getCount() {
    return;
  }

  getQuantity() {
    return;
  }

  getTotal(): number {
    return;
  }

  addDiscount(
    name: string,
    discount: { type: string; amount: number; max?: number },
  ) {
    let totalDiscount = 0;

    switch (discount?.type) {
      case 'fixed':
        totalDiscount += discount.amount;
        break;
      case 'percentage':
        totalDiscount +=
          discount?.max &&
          (this.getTotal() * discount.amount) / 100 > discount?.max
            ? discount?.max
            : (this.getTotal() * discount.amount) / 100;
        break;
    }

    return totalDiscount;
  }

  removePromotion(name: string) {
    return;
  }

  addFreebie(
    name: string,
    conditions: { type: string; productId: string },
    reward: { productId: string; quantity: number },
  ) {
    if (
      conditions?.type === 'contains' &&
      this.hasProducts(conditions?.productId || null)
    ) {
      this.addProduct(reward?.productId, reward?.quantity);
    }
    return;
  }
}
