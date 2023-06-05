// @ts-nocheck
import { getProductByTypeAndColor } from "../modules/productData.js";
import { productPublisher,jokePublisher } from "../modules/updateProduct.js";

export function updateProductDetails() {
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("product-price");
  const urlParams = new URLSearchParams(window.location.search);
  const typeValue = urlParams.get("type") || "shirt";
  const colorValue = urlParams.get("color") || "white";
  const jokeValue = urlParams.get("joke"); 

  const colorOptions = document.querySelectorAll('input[name="color"]');
  colorOptions.forEach((option) => {
    option.addEventListener("change", () => {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("color", option.value);
      urlParams.set("joke", jokeValue); 
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
      updateProductDetails();
    });
  });

  colorOptions.forEach((option) => {
    option.checked = option.value === colorValue;
  });

  const product = getProductByTypeAndColor(typeValue, colorValue);

  if (product) {
    productImage.src = `img/${product.image}`;
    productTitle.textContent = product.title;
    productPrice.textContent = `${product.price}`;
    productPublisher.notify(product);
  } else {
    productImage.src = "";
    productTitle.textContent = "Producto no encontrado";
    productPrice.textContent = "";
    productPublisher.notify(null);
  }

  jokePublisher.notify(jokeValue);
}
