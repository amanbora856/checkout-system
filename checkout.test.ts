import { Checkout, Product, PricingRule } from "./main"; // Assuming Checkout is in a separate file

const products: Product[] = [
  { sku: "ipd", name: "Super iPad", price: 549.99 },
  { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
  { sku: "atv", name: "Apple TV", price: 109.5 },
  { sku: "vga", name: "VGA adapter", price: 30.0 },
];

const appleTvDeal: PricingRule = {
  apply: (items) => {
    const appleTvCount = items.filter((item) => item.sku === "atv").length;
    const discount = Math.floor(appleTvCount / 3) * 109.5;
    return discount;
  },
};

const superIpdBulkDiscount: PricingRule = {
  apply: (items) => {
    const superIpdCount = items.filter((item) => item.sku === "ipd").length;
    if (superIpdCount > 4) {
      const discount = superIpdCount * 549.99 - superIpdCount * 499.99;
      return discount;
    }
    return 0;
  },
};

describe("Checkout system", () => {
  console.log("testing for the testcases");
  it("should calculate total with 3 Apple TVs (3 for 2 deal)", () => {
    const co = new Checkout([appleTvDeal]);
    co.scan(products[2]); // atv
    co.scan(products[2]); // atv
    co.scan(products[2]); // atv
    console.log("abc", co.total());
    expect(co.total()).toBe(219.0); // 2 * 109.50
    console.log("🚀 ~ it ~ 109.50:", co.total);
  });

  it("should calculate total with multiple Super iPads (bulk discount)", () => {
    const co = new Checkout([superIpdBulkDiscount]);
    co.scan(products[0]);
    co.scan(products[0]);
    co.scan(products[0]);
    co.scan(products[0]);
    co.scan(products[0]);
    expect(co.total()).toBe(2499.95); // 5 * 499.99
  });

  it("should calculate total with mixed items", () => {
    const co = new Checkout([appleTvDeal, superIpdBulkDiscount]);
    co.scan(products[2]); // atv
    co.scan(products[2]); // atv
    co.scan(products[2]); // atv
    co.scan(products[0]);
    co.scan(products[0]);
    co.scan(products[0]);
    co.scan(products[0]);
    co.scan(products[0]);
    expect(co.total()).toBe(2718.95); // Apple TV deal + Bulk Super iPad discount
  });
});
