import Product from "../config/product.js";
import { updateCartList } from "./updateCart.js";

export function loadCartFromLocalStorage(cart) {
  cart.clearCart(); 
  const cartItems = localStorage.getItem("cartItems");

  if (cartItems) {
    const parsedCartItems = JSON.parse(cartItems);
    parsedCartItems.forEach((item) => {
      const product = new Product(
        item.title,
        item.color,
        item.price,
        item.joke,
        item.image
      );
      cart.addToCart(product);
    });
    updateCartList(cart);
  }
}
