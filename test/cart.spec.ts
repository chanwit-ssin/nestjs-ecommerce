import { Cart } from './cart';

describe('cart', () => {
  let cart: Cart;

  beforeAll(() => {
    cart = new Cart(1);
  });

  it('add product', () => {
    cart.add(1, 1);

    expect(!!cart.products.find((p) => p.productId === 1)).toBe(true);
    expect(cart.hasProducts(1)).toBe(true);
    expect(cart.isEmpty()).toBe(false);
  });

  it('update product', () => {
    cart.update(1, 2);
    console.log(cart.products)
    expect(cart.products.find((p) => p.productId === 1).quantity).toBe(2);
    expect(cart.isEmpty()).toBe(false);
  });

  it('remove product', () => {
    cart.remove(1);

    expect(!cart.products.find((p) => p.productId === 1)).toBe(true);
    expect(cart.hasProducts(1)).toBe(false);
    expect(cart.isEmpty()).toBe(true);
  });

  it('get total', () => {
    const total = cart.getTotal()

    expect(total).toEqual(0);
    expect(cart.isEmpty()).toBe(true);
  });

  it('cart2', () => {
    const cart2 = new Cart(2);
    cart2.add(1, 2);
    cart2.add(2, 3);
    cart2.update(1, 5);

    expect(cart2.getTotal()).toEqual(2900);

    // cart2.addDiscount('')
  })
});
