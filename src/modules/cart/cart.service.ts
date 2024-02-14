import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from '../cart-product/cart-product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
  ) {}

  async findCartByUserId(userId: string) {
    try {
      let cart = await this.cartRepository.findOne({ where: { userId } });
      if (!cart) cart = await this.createCart(userId);
      return cart;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async createCart(userId: string) {
    return await this.cartRepository.save({ userId });
  }

  async addProduct(productId: string, quantity: number, userId: string) {
    try {
      let cart = await this.findCartByUserId(userId);

      // update quantity
      let cartProduct = await this.cartProductRepository.findOne({
        where: { cartId: cart.id, productId },
      });
      if (cartProduct) {
        cartProduct.quantity += quantity;
        await this.cartProductRepository.save(cartProduct);
      } else {
        await this.cartProductRepository.save({
          cartId: cart.id,
          productId,
          quantity,
        });
      }

      return await this.findCartByUserId(userId);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async removeProduct(productId: string, quantity: number, userId: string) {
    try {
      let cart = await this.findCartByUserId(userId);

      // update quantity
      let cartProduct = await this.cartProductRepository.findOne({
        where: { cartId: cart.id, productId },
      });

      if (cartProduct) {
        if (quantity > cartProduct.quantity) {
          throw new BadRequestException(
            'quantity in cart must be greater than',
          );
        } else if (quantity < cartProduct.quantity) {
          cartProduct.quantity -= quantity;
          await this.cartProductRepository.save(cartProduct);
        } else if (quantity === cartProduct.quantity) {
          await this.cartProductRepository.delete({
            cartId: cart.id,
            productId,
          });
        }
      }

      return await this.findCartByUserId(userId);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  hasProducts(productId: string) {
    return true; // boolean
  }

  isEmpty() {
    console.log(
      this.cartRepository
        .createQueryBuilder('cart')
        .loadRelationCountAndMap(
          'cart.totalProducts',
          'cart.cartProducts',
          'products',
        )
        .getMany(),
    );
    return; // boolean
  }

  getCount() {
    return;
  }

  getQuantity() {
    return;
  }

  // async getTotal(cartId: string) {
  //   const cart = await this.cartRepository.findOne({ where: { id: cartId } });

  //   return cart.totalPrice;
  // }

  async addDiscount(
    name: string,
    discount: { type: string; amount: number; max?: number },
    userId?: string,
  ) {
    let cart = await this.findCartByUserId(userId);
    let totalDiscount = 0;

    switch (discount?.type) {
      case 'fixed':
        totalDiscount += discount.amount;
        break;
      case 'percentage':
        totalDiscount +=
          discount?.max &&
          (cart.totalPrice * discount.amount) / 100 > discount?.max
            ? discount?.max
            : (cart.totalPrice * discount.amount) / 100;
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
    userId: string,
  ) {
    if (
      conditions?.type === 'contains' &&
      this.hasProducts(conditions?.productId || null)
    ) {
      this.addProduct(reward?.productId, reward?.quantity, userId);
    }
    return;
  }
}
