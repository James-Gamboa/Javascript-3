import { getRandomJoke, getJokeById } from "../modules/api.js";
import { Publisher } from "../js/observer.js";
import { products } from "../modules/productData.js";

const productPublisher = new Publisher();
const colorPublisher = new Publisher();
const jokePublisher = new Publisher();

const urlParams = new URLSearchParams(window.location.search);
const selectedJoke = urlParams.get("joke");
const selectedJokeElement = document.getElementById("selected-joke");
selectedJokeElement.textContent = selectedJoke;


function updateProductDetails() {
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("product-price");
  const colorOptions = document.querySelectorAll('input[name="color"]');
  const typeValue = urlParams.get("type") || "shirt";
  let colorValue = urlParams.get("color") || "white";

  const selectedColor = document.querySelector('input[name="color"]:checked');
  if (selectedColor?.value === "black") {
    colorValue = "black";
  }

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
}

function updateSelectedJoke(joke) {
  const selectedJokeElement = document.getElementById("selected-joke");
  selectedJokeElement.textContent = joke;

  const productImageContainer = document.getElementById("product-image-container");
  productImageContainer.dataset.joke = joke;
}

const randomJokeButton = document.getElementById("random-joke-button");
if (randomJokeButton) {
  randomJokeButton.addEventListener("click", () => {
    getRandomJoke()
      .then((newJoke) => {
        updateSelectedJoke(newJoke);
        jokePublisher.notify(newJoke);
      })
      .catch((error) => {
        console.log(error);
        const selectedJokeElement = document.getElementById("selected-joke");
        selectedJokeElement.textContent = "Error al obtener el chiste";
      });
  });
}

function fetchJokeById(jokeId) {
  getJokeById(jokeId)
    .then((newJoke) => {
      updateSelectedJoke(newJoke);
      jokePublisher.notify(newJoke);
    })
    .catch((error) => {
      console.log(error);
      const selectedJokeElement = document.getElementById("selected-joke");
      selectedJokeElement.textContent = "Error al obtener el chiste";
    });
}

function getProductByTypeAndColor(type, color) {
  return products?.[type]?.[color] || null;
}

document.addEventListener("DOMContentLoaded", () => {
  const colorOptions = document.querySelectorAll('input[name="color"]');
  colorOptions.forEach((option) => {
    option.addEventListener("change", updateProductDetails);
  });

  const otherProductLinks = document.querySelectorAll(".other-products a");
  otherProductLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const type = link.dataset.type;
      const color = link.dataset.color;
      const url = `ecommerce.html?type=${type}&color=${color}&joke=${selectedJoke}`;
      window.location.href = url;
    });
  });

  productPublisher.subscribe({
    update: ({ type, color }) => {
      const url = `ecommerce.html?type=${type}&color=${color}&joke=${selectedJoke}`;
      history.replaceState(null, null, url);
    },
  });

  colorPublisher.subscribe({
    update: (color) => {
      const url = `ecommerce.html?type=${urlParams.get("type")}&color=${color}&joke=${selectedJoke}`;
      history.replaceState(null, null, url);
    },
  });

  jokePublisher.subscribe({
    update: (joke) => {
      const url = `ecommerce.html?type=${urlParams.get("type")}&color=${urlParams.get("color")}&joke=${joke}`;
      history.replaceState(null, null, url);
    },
  });

  const jokeId = urlParams.get("jokeId");
  if (jokeId) {
    fetchJokeById(jokeId);
  }

  function storeJokeId() {
    localStorage.setItem("jokeId", jokeId);
  }

  window.addEventListener("beforeunload", storeJokeId);

  updateProductDetails();
});