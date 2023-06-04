// @ts-nocheck
import Cart from "../config/cart.js";
import Product from "../config/product.js";

const cart = new Cart();

const addToCartButton = document.getElementById("add-to-cart-btn");
addToCartButton.addEventListener("click", addToCartClicked);

function addToCartClicked() {
  const product = createProductObject();
  product.id = cart.products.length;
  cart.addToCart(product);

  const productImage = document.getElementById("product-image");
  const productImagePath = productImage.getAttribute("src");
  product.image = productImagePath;

  updateCartList();
  saveCartToLocalStorage();
}

function createProductObject() {
  const productTitle = document.getElementById("product-title").textContent;
  const productColor = document.querySelector(
    'input[name="color"]:checked'
  ).value;
  const productPrice = document.getElementById("product-price").textContent;
  const selectedJoke = document.getElementById("selected-joke").textContent;

  return new Product(productTitle, productColor, productPrice, selectedJoke);
}

function removeAllFromCartClicked() {
  cart.removeAllFromCart();
  updateCartList();
  saveCartToLocalStorage();
}

function removeProductFromCartClicked(product) {
  cart.removeFromCart(product);
  updateCartList();
  saveCartToLocalStorage();
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
        removeProductFromCartClicked(product);
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
    removeAllButton.addEventListener("click", removeAllFromCartClicked);

    cartContainer.appendChild(closeButton);
    cartContainer.appendChild(removeAllButton);

    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
}

const openCartButton = document.getElementById("open-cart-btn");
const cartContainer = document.getElementById("cart-container");

openCartButton.addEventListener("click", () => {
  cartContainer.style.display = "block";
});

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

loadCartFromLocalStorage();
updateCartList();

addToCartButton.addEventListener("click", saveCartToLocalStorage);
const removeAllButton = document.getElementById("remove-all-button");
removeAllButton.addEventListener("click", saveCartToLocalStorage);