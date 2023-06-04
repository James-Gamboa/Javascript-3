import { getProductByTypeAndColor } from "../modules/productData.js";
import { productPublisher, colorPublisher, jokePublisher } from "../modules/updateProduct.js";

export function updateProductDetails(colorValue = "white", selectedJoke = null) {
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("product-price");
  const urlParams = new URLSearchParams(window.location.search);
  const typeValue = urlParams.get("type") || "shirt";

  const colorOptions = document.querySelectorAll('input[name="color"]');
  colorOptions.forEach((option) => {
    option.addEventListener("change", () => {
      colorValue = option.value;
      updateProductDetails(colorValue, selectedJoke);
    });
  });

  colorOptions.forEach((option) => {
    option.checked = option.value === colorValue;
  });

  const product = getProductByTypeAndColor(typeValue, colorValue);
  if (product) {
    productImage.src = `img/${product.image}`;
    productImage.alt = product.title;
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
  }

  productPublisher.notify({ type: typeValue, color: colorValue });
  colorPublisher.notify(colorValue);
  
  const joke = urlParams.get("joke");
  if (joke) {
    localStorage.setItem("selectedJoke", joke);
    selectedJoke = joke;
  } else {
    localStorage.removeItem("selectedJoke");
    selectedJoke = null;
  }
  

  jokePublisher.notify(selectedJoke);
}