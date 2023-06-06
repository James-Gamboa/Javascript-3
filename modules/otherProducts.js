import { getProductByTypeAndColor } from "../modules/productData.js";

const otherProductsContainer = document.querySelector(".other-products");

const heading = document.createElement("h3");
heading.textContent = "Otros productos:";
otherProductsContainer.appendChild(heading);

const ul = document.createElement("ul");
otherProductsContainer.appendChild(ul);

const productsToShow = [
  { type: "pillow", color: "white" },
  { type: "case", color: "white" },
  { type: "poster", color: "white" }
];

productsToShow.forEach((product) => {
  const productInfo = getProductByTypeAndColor(product.type, product.color);

  if (productInfo) {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = "#";
    link.dataset.type = product.type;
    link.dataset.color = product.color;
    li.appendChild(link);

    const img = document.createElement("img");
    img.src = `img/${productInfo.image}`;
    img.alt = `Product ${productInfo.title}`;
    link.appendChild(img);

    const span = document.createElement("span");
    span.textContent = productInfo.title;
    link.appendChild(span);

    ul.appendChild(li);
  }
});
