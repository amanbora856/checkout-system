var Checkout = /** @class */ (function () {
    function Checkout(pricingRules) {
        this.items = [];
        this.pricingRules = pricingRules;
    }
    // Method to scan an item
    Checkout.prototype.scan = function (item) {
        this.items.push(item);
    };
    // Calculate the total applying all pricing rules
    Checkout.prototype.total = function () {
        var total = this.items.reduce(function (sum, item) { return sum + item.price; }, 0);
        // Apply all pricing rules and adjust total accordingly
        for (var _i = 0, _a = this.pricingRules; _i < _a.length; _i++) {
            var rule = _a[_i];
            total -= rule.apply(this.items); // Apply discounts as a reduction from total
        }
        return total;
    };
    return Checkout;
}());
// Define the products
var products = [
    { sku: "ipd", name: "Super iPad", price: 549.99 },
    { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
    { sku: "atv", name: "Apple TV", price: 109.50 },
    { sku: "vga", name: "VGA adapter", price: 30.00 },
];
// Pricing rule for "3 for 2" Apple TV deal
var appleTvDeal = {
    apply: function (items) {
        var appleTvCount = items.filter(function (item) { return item.sku === 'atv'; }).length;
        var discount = Math.floor(appleTvCount / 3) * 109.50; // Every 3rd Apple TV is free
        return discount;
    }
};
// Pricing rule for Super iPad bulk discount
var superIpdBulkDiscount = {
    apply: function (items) {
        var superIpdCount = items.filter(function (item) { return item.sku === 'ipd'; }).length;
        if (superIpdCount > 4) {
            // Calculate discount: the difference in price for each Super iPad when more than 4 are bought
            var discount = (superIpdCount * 549.99) - (superIpdCount * 499.99);
            return discount;
        }
        return 0;
    }
};
// Initialize the checkout system with the pricing rules
var pricingRules = [appleTvDeal, superIpdBulkDiscount];
var co = new Checkout(pricingRules);
// Example scans
co.scan(products[2]); // atv
co.scan(products[2]); // atv
co.scan(products[2]);
co.scan(products[2]);
co.scan(products[2]);
co.scan(products[2]);
co.scan(products[2]); // atv
co.scan(products[3]); // vga
console.log(co.total()); // Expected total: $249.00
co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
co.scan(products[0]); // ipd
console.log(co.total()); // Expected total with bulk discount for ipd
//   const products: Product[] = [
//     { sku: "ipd", name: "Super iPad", price: 549.99 },
//     { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
//     { sku: "atv", name: "Apple TV", price: 109.50 },
//     { sku: "vga", name: "VGA adapter", price: 30.00 },
//   ];
