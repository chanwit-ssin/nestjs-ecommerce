import { Cart } from './cart';

describe('cart', () => {
  let cart: Cart;

  beforeAll(() => {
    cart = new Cart(1);
  });

  it('addProduct', () => {
    cart.add(1, 1);

    expect(!!cart.products.find((p) => p.productId === 1)).toBe(true);
    expect(cart.hasProducts(1)).toBe(true);
    expect(cart.isEmpty()).toBe(false);
  });

  it('updateProduct', () => {
    cart.update(1, 2);
    expect(cart.products.find((p) => p.productId === 1).quantity).toBe(2);
    expect(cart.isEmpty()).toBe(false);
  });

  it('removeProduct', () => {
    cart.remove(1);

    expect(!cart.products.find((p) => p.productId === 1)).toBe(true); // must be equal hasProduct(1)
    expect(cart.hasProducts(1)).toBe(false);
    expect(cart.isEmpty()).toBe(true);
  });

  it('getTotal', () => {
    const total = cart.getTotal();

    expect(total).toEqual(0);
    expect(cart.isEmpty()).toBe(true);
  });

  it('getCart2', () => {
    const cart2 = new Cart(2);
    cart2.add(1, 2);
    cart2.add(2, 3);
    cart2.update(1, 5);

    expect(cart2.getTotal()).toEqual(2900);

    cart2.addDiscount('fixedDiscount', {
      type: 'fixed',
      amount: 200,
    });
    expect(cart2.getTotal()).toEqual(2700);

    cart2.addDiscount('percentageDiscount1', {
      type: 'percentage',
      amount: 10,
      max: 300,
    });
    expect(cart2.getTotal()).toEqual(2430);

    cart2.addFreebie(
      'freebie',
      {
        productId: 1,
        type: 'contains',
      },
      {
        productId: 5,
        quantity: 1,
      },
    );

    expect(cart2.hasProducts(5)).toBe(true);
    expect(cart2.getTotal()).toEqual(2430);
  });

  it('getCart3', () => {
    const cart3 = new Cart(3);
    cart3.add(7, 5);
    cart3.add(2, 3);
    cart3.update(1, 5); // not found in cart = can't update

    cart3.addDiscount('fixedDiscount1', {
      type: 'fixed',
      amount: 200,
    });

    cart3.addDiscount('fixedDiscount2', {
      type: 'fixed',
      amount: 20,
    });

    cart3.addDiscount('fixedDiscount3', {
      type: 'fixed',
      amount: 50,
    });

    cart3.removeDiscount('fixedDiscount3');

    cart3.addFreebie(
      'freebie',
      {
        productId: 1,
        type: 'contains',
      },
      {
        productId: 5,
        quantity: 1,
      },
    );

    expect(cart3.hasProducts(5)).toBe(false);
    expect(cart3.getTotal()).toEqual(4180);

    cart3.addDiscount('percentageDiscount1]', {
      type: 'percentage',
      amount: 10,
      max: 30,
    });

    expect(cart3.getTotal()).toEqual(4150);
  });
});
