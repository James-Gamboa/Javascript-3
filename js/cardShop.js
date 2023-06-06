import Cart from "../config/cart.js";
import { addToCartClicked } from "../modules/addToCart.js";
import { openCartButtonClicked } from "../modules/openCart.js";
import { createProductObject } from "../modules/createProduct.js";
import { loadCartFromLocalStorage } from "../modules/loadCart.js";
import { saveCartToLocalStorage } from "../modules/saveCart.js";
import { updateCartList } from "../modules/updateCart.js";

const cart = new Cart();
const cartContainer = document.getElementById("cart-container");

const addToCartButton = document.getElementById("add-to-cart-btn");
if (addToCartButton) {
  addToCartButton.addEventListener("click", addToCartClicked(cart, createProductObject, updateCartList, saveCartToLocalStorage));
}

const openCartButton = document.getElementById("open-cart-btn");
if (openCartButton) {
  openCartButton.addEventListener("click", () => {
    loadCartFromLocalStorage(cart, updateCartList);
    openCartButtonClicked(cartContainer)();
  });
}

const removeAllButton = document.getElementById("remove-all-button");
if (removeAllButton) {
  removeAllButton.addEventListener("click", () => {
    saveCartToLocalStorage(cart);
  });
}