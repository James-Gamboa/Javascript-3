export function removeAllFromCartClicked(cart, updateCartList, saveCartToLocalStorage) {
  return function () {
    cart.removeAllFromCart();
    updateCartList();
    saveCartToLocalStorage();
  };
}
