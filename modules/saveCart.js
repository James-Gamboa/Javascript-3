export function saveCartToLocalStorage(cart) {
  if (cart && cart.products) {
    const cartItems = JSON.stringify(cart.products);
    localStorage.setItem("cartItems", cartItems);
  }
}