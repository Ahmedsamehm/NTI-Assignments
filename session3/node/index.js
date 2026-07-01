import { addToCart } from "./modules/addToCart.js";
import { removeFromCart } from "./modules/removeFromCart.js";
import { listCart } from "./modules/listCart.js";
import { calculateTotal } from "./modules/calculateTotal.js";

addToCart(1);
addToCart(2);
addToCart(1);
listCart();
calculateTotal();
removeFromCart(2);
listCart();
calculateTotal();
