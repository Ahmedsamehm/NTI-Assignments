import cart from "../data/cart.js";

export function listCart() {
  if (!cart.length) {
    console.log("Cart is empty.");
    return;
  }

  console.log("Cart items:");
  cart.forEach((item) => {
    console.log(`${item.name} x${item.quantity} - $${item.price * item.quantity}`);
  });
}
