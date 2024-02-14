interface Product {
  productId: number;
  quantity: number;
  isFreebie?: boolean;
}

interface Discount {
  name: string;
  condition: DiscountCondition;
}

interface DiscountCondition {
  type: string;
  amount: number;
  max?: number;
}

interface Freebie {
  name: string;
  condition: FreebieCondition;
  reward: Product;
}

interface FreebieCondition {
  type: string;
  productId: number;
}

const PRODUCT = {
  1: 400,
  2: 300,
  3: 200,
  4: 100,
  5: 500,
  6: 600,
  7: 700,
  8: 800,
  9: 900,
};

export class Cart {
  readonly customerId: number;
  products: Product[];
  discounts: Discount[];
  freebies: Freebie[];
  //   totalDiscount: number;
  //   totalPrice: number;

  constructor(customerId: number) {
    this.customerId = customerId;
    this.products = [];
    this.discounts = [];
    this.freebies = [];
  }

  add(productId: number, quantity: number, isFreebie: boolean = false) {
    this.products.push({
      productId: productId,
      quantity: quantity,
      isFreebie,
    });
  }

  update(productId: number, quantity: number) {
    const index = this.products.findIndex((p) => p.productId === productId);
    if (index >= 0) this.products[index].quantity = quantity;
  }

  remove(productId: number) {
    this.products = this.products.filter((p) => p.productId !== productId);
  }

  hasProducts(productId: number) {
    return !!this.products.find((p) => p.productId === productId);
  }

  isEmpty() {
    return this.products.length === 0;
  }

  getCount() {
    return this.products;
  }

  getQuantity() {
    return this.products.reduce((total, p) => total + p.quantity, 0);
  }

  getTotal() {
    let totalPrice = this.products
      .filter((p) => !p.isFreebie)
      .reduce((total, p) => total + p.quantity * PRODUCT[p.productId], 0);

    for (let discount of this.discounts) {
      const { condition } = discount;
      const { amount, type, max } = condition;
      switch (type) {
        case 'fixed':
          totalPrice -= amount;
          break;
        case 'percentage':
          totalPrice -=
            max && (totalPrice * amount) / 100 > max
              ? max
              : (totalPrice * amount) / 100;
          console.log(
            'ceo: ',
            max && (totalPrice * amount) / 100 > max
              ? max
              : (totalPrice * amount) / 100,
          );
          break;
      }
    }

    return totalPrice;
  }

  async addDiscount(name: string, condition: DiscountCondition) {
    this.discounts.push({
      name,
      condition,
    });
  }

  removeDiscount(name: string) {
    this.discounts = this.discounts.filter((d) => d.name !== name);
  }

  addFreebie(name: string, condition: FreebieCondition, reward: Product) {
    const { type } = condition;
    if (type === 'contains' && this.hasProducts(condition?.productId || null)) {
      this.add(reward?.productId, reward?.quantity, true);
      this.freebies.push({ name, condition, reward });
    }
  }
}
