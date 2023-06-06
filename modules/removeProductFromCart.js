export function removeProductFromCartClicked(cart, updateCartList, saveCartToLocalStorage) {
  return function (index) {
    cart.removeFromCart(index);
    updateCartList();
    saveCartToLocalStorage();
  };
}