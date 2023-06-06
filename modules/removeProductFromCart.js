export function removeProductFromCartClicked(cart, updateCartListFunction, saveCartToLocalStorage) {
  return function(index) {
    cart.removeFromCart(index);
    updateCartListFunction();
    saveCartToLocalStorage(cart);
  };
}
