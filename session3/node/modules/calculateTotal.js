import cart from "../data/cart.js";

export function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log(`Total: $${total}`);
  return total;
}
