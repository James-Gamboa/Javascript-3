import { removeProductFromCartClicked } from "../modules/removeProductFromCart.js";
import { removeAllFromCartClicked } from "../modules/removeAllFromCart.js";
import { saveCartToLocalStorage } from "../modules/saveCart.js";

export function updateCartList(cart) {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (cart && Array.isArray(cart.products) && cart.products.length > 0) {
    cart.products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "cart-product";
      productElement.innerHTML = product.createMarkup();

      const removeButton = productElement.querySelector(".remove-product");
      removeButton.addEventListener("click", () => {
        const index = cart.products.indexOf(product);
        removeProductFromCartClicked(cart, updateCartList, saveCartToLocalStorage)(index);
        updateCartList(cart);

      cartContainer.appendChild(productElement);
    });

    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", () => {
      cartContainer.innerHTML = "";
      cartContainer.style.display = "none";
      saveCartToLocalStorage(cart); 
    });

    const removeAllButton = document.createElement("button");
    removeAllButton.id = "remove-all-button";
    removeAllButton.textContent = "Remover todo";
    removeAllButton.addEventListener("click", () => {
      removeAllFromCartClicked(cart, updateCartList, saveCartToLocalStorage);
    });

    cartContainer.appendChild(removeAllButton);
    cartContainer.appendChild(closeButton);

    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
}