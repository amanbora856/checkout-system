export type Product = {
  sku: string;
  name: string;
  price: number;
};

export type PricingRule = {
  apply: (items: Product[]) => number;
};

export class Checkout {
  private items: Product[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  // Method to scan an item
  scan(item: Product) {
    this.items.push(item);
  }

  // Calculate the total applying all pricing rules
  total(): number {
    let total = this.items.reduce((sum, item) => sum + item.price, 0);

    // Apply all pricing rules and adjust total accordingly
    for (const rule of this.pricingRules) {
      total -= rule.apply(this.items); // Apply discounts as a reduction from total
    }

    return total;
  }
}

// Define the products
const products: Product[] = [
  { sku: "ipd", name: "Super iPad", price: 549.99 },
  { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
  { sku: "atv", name: "Apple TV", price: 109.5 },
  { sku: "vga", name: "VGA adapter", price: 30.0 },
];

// Pricing rule for "3 for 2" Apple TV deal
const appleTvDeal: PricingRule = {
  apply: (items) => {
    const appleTvCount = items.filter((item) => item.sku === "atv").length;
    const discount = Math.floor(appleTvCount / 3) * 109.5; // Every 3rd Apple TV is free
    return discount;
  },
};

// Pricing rule for Super iPad bulk discount
const superIpdBulkDiscount: PricingRule = {
  apply: (items) => {
    const superIpdCount = items.filter((item) => item.sku === "ipd").length;
    if (superIpdCount > 4) {
      // Calculate discount: the difference in price for each Super iPad when more than 4 are bought
      const discount = superIpdCount * 549.99 - superIpdCount * 499.99;
      return discount;
    }
    return 0;
  },
};

// Initialize the checkout system with the pricing rules
const pricingRules = [appleTvDeal, superIpdBulkDiscount];
const co = new Checkout(pricingRules);

// Example scans
co.scan(products[2]); // atv
co.scan(products[2]); // atv
co.scan(products[2]);
co.scan(products[2]);
co.scan(products[2]);
co.scan(products[2]);
co.scan(products[2]); // atv
co.scan(products[3]); // vga
//console.log(co.total()); // Expected total: $249.00

co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
//console.log(co.total()); // Expected total with bulk discount for ipd
//   const products: Product[] = [
//     { sku: "ipd", name: "Super iPad", price: 549.99 },
//     { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
//     { sku: "atv", name: "Apple TV", price: 109.50 },
//     { sku: "vga", name: "VGA adapter", price: 30.00 },
//   ];
