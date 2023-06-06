export function removeAllFromCartClicked(cart, updateCartListFunction, saveCartToLocalStorage) {
  cart.removeAllFromCart();
  updateCartListFunction();
  saveCartToLocalStorage(cart);
}