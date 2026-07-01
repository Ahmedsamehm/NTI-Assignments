import products from "../data/products.js";
import cart from "../data/cart.js";

export function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    console.log("Product not found.");
    return;
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  console.log(`Added ${product.name} to cart.`);
}
