export function renderProductDetails(product, jokeId) {
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("product-price");
  const selectedJoke = document.getElementById("selected-joke");

  if (product) {
    productImage.src = `img/${product.image}`;
    productImage.alt = product.title;
    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
    selectedJoke.textContent = jokeId || "No joke selected";
  }
}

export function renderOtherProducts(container, products, urlParams, jokeId) {
  const typeValue = urlParams.get("type") || "shirt";
  const colorValue = urlParams.get("color") || "white";

  container.innerHTML = "";

  for (const type in products) {
    if (type !== typeValue) {
      const color = products[type][colorValue];
      if (color) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const img = document.createElement("img");
        const span = document.createElement("span");

        a.href = `ecommerce.html?type=${type}&color=${colorValue}&joke=${jokeId}`;
        img.src = `img/${color.image}`;
        img.alt = `Product ${type} ${colorValue}`;
        span.textContent = type.charAt(0).toUpperCase() + type.slice(1);

        a.appendChild(img);
        a.appendChild(span);
        li.appendChild(a);
        container.appendChild(li);
      }
    }
  }
}
