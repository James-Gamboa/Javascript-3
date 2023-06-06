import Product from "../config/product.js";

export function createProductObject() {
  const productTitle = document.getElementById("product-title").textContent;
  const productColor = document.querySelector('input[name="color"]:checked').value;
  const productPrice = document.getElementById("product-price").textContent;
  const selectedJoke = document.getElementById("selected-joke").textContent;

  return new Product(productTitle, productColor, productPrice, selectedJoke);
}
