import cart from "../data/cart.js";

export function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);

  if (index === -1) {
    console.log("Item not found in cart.");
    return;
  }

  const removedItem = cart[index];

  if (removedItem.quantity > 1) {
    removedItem.quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  console.log(`Removed ${removedItem.name} from cart.`);
}
