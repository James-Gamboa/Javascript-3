// @ts-nocheck
import Cart from "../config/cart.js";
import Product from "../config/product.js";
import { addToCartClicked } from "../modules/addToCart.js";
import { removeAllFromCartClicked } from "../modules/removeAllFromCart.js";
import { removeProductFromCartClicked } from "../modules/removeProductFromCart.js";
import { openCartButtonClicked } from "../modules/openCart.js";

const cart = new Cart();

const addToCartButton = document.getElementById("add-to-cart-btn");
addToCartButton.addEventListener("click", addToCartClicked(cart, createProductObject, updateCartList, saveCartToLocalStorage));

function createProductObject() {
  const productTitle = document.getElementById("product-title").textContent;
  const productColor = document.querySelector('input[name="color"]:checked').value;
  const productPrice = document.getElementById("product-price").textContent;
  const selectedJoke = document.getElementById("selected-joke").textContent;

  return new Product(productTitle, productColor, productPrice, selectedJoke);
}

const openCartButton = document.getElementById("open-cart-btn");
const cartContainer = document.getElementById("cart-container");

openCartButton.addEventListener("click", openCartButtonClicked(cartContainer));

function loadCartFromLocalStorage() {
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
    updateCartList();
  }
}

function saveCartToLocalStorage() {
  const cartItems = JSON.stringify(cart.products);
  localStorage.setItem("cartItems", cartItems);
}

function updateCartList() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  if (cart.products.length > 0) {
    cart.products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "cart-product";
      productElement.innerHTML = product.createMarkup();

      const removeButton = productElement.querySelector(".remove-product");
      removeButton.addEventListener("click", () => {
        const index = cart.products.indexOf(product);
        removeProductFromCartClicked(cart, updateCartList, saveCartToLocalStorage)(index);
      });

      cartContainer.appendChild(productElement);
    });

    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", () => {
      cartContainer.innerHTML = "";
      cartContainer.style.display = "none";
    });

    const removeAllButton = document.createElement("button");
    removeAllButton.id = "remove-all-button";
    removeAllButton.textContent = "Remover todo";
    removeAllButton.addEventListener("click", removeAllFromCartClicked(cart, updateCartList, saveCartToLocalStorage));

    cartContainer.appendChild(closeButton);
    cartContainer.appendChild(removeAllButton);

    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
}

loadCartFromLocalStorage();
updateCartList();

addToCartButton.addEventListener("click", saveCartToLocalStorage);
const removeAllButton = document.getElementById("remove-all-button");
removeAllButton.addEventListener("click", saveCartToLocalStorage);