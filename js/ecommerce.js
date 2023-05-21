import { getJokeById, getRandomJoke } from "../modules/api.js";
import { Publisher } from "./observer.js";

const productPublisher = new Publisher();
const colorPublisher = new Publisher();
const jokePublisher = new Publisher();

const urlParams = new URLSearchParams(window.location.search);
let joke = urlParams.get("joke");

const products = {
  shirt: {
    white: {
      image: "product-shirt-white.jpg",
      title: "Camisa Blanca",
      price: "$10",
    },
    black: {
      image: "product-shirt-black.jpg",
      title: "Camisa Negra",
      price: "$13",
    },
  },
  case: {
    white: {
      image: "product-case-white.jpg",
      title: "Estuche de Celular Blanco",
      price: "$5",
    },
    black: {
      image: "product-case-black.jpg",
      title: "Estuche de Celular Negro",
      price: "$7",
    },
  },
  poster: {
    white: {
      image: "product-poster-white.jpg",
      title: "Poster Blanco",
      price: "$3",
    },
    black: {
      image: "product-poster-black.jpeg",
      title: "Poster Negro",
      price: "$5",
    },
  },
  pillow: {
    white: {
      image: "product-pillow-white.jpg",
      title: "Almohada Blanca",
      price: "$12",
    },
    black: {
      image: "product-pillow-black.jpg",
      title: "Almohada Negra",
      price: "$15",
    },
  },
};

function updateProductDetails() {
  const productImage = document.getElementById("product-image");
  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("product-price");
  const colorOptions = document.querySelectorAll('input[name="color"]');
  const typeValue = urlParams.get("type") || "shirt";
  let colorValue = urlParams.get("color") || "white";

  const selectedColor = document.querySelector('input[name="color"]:checked');
  if (selectedColor && selectedColor.value === "black") {
    colorValue = "black";
  }

  colorOptions.forEach((option) => {
    if (option.value === colorValue) {
      option.checked = true;
    }
  });

  const product = products[typeValue][colorValue];
  productImage.src = `img/${product.image}`;
  productImage.alt = product.title;
  productTitle.textContent = product.title;
  productPrice.textContent = product.price;

  productPublisher.notify({ type: typeValue, color: colorValue });
  colorPublisher.notify(colorValue);
}

function updateSelectedJoke(joke) {
  const selectedJoke = document.getElementById("selected-joke");
  selectedJoke.textContent = joke;

  const productImageContainer = document.getElementById(
    "product-image-container"
  );
  productImageContainer.setAttribute("data-joke", joke);
}

function generateRandomJoke() {
  getRandomJoke()
    .then((newJoke) => {
      joke = newJoke;
      updateSelectedJoke(joke);
      jokePublisher.notify(joke);
    })
    .catch((error) => {
      console.log(error);
      const selectedJoke = document.getElementById("selected-joke");
      selectedJoke.textContent = "Error al obtener el chiste";
    });
}

function fetchJokeById(jokeId) {
  getJokeById(jokeId)
    .then((newJoke) => {
      joke = newJoke;
      updateSelectedJoke(joke);
      jokePublisher.notify(joke);
    })
    .catch((error) => {
      console.log(error);
      const selectedJoke = document.getElementById("selected-joke");
      selectedJoke.textContent = "Error al obtener el chiste";
    });
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
      const type = link.getAttribute("data-type");
      const color = link.getAttribute("data-color");
      const url = `ecommerce.html?type=${type}&color=${color}&joke=${encodeURIComponent(
        joke
      )}`;
      window.location.href = url;
    });
  });

  productPublisher.subscribe({
    update: (data) => {
      const { type, color } = data;
      const url = `ecommerce.html?type=${type}&color=${color}&joke=${encodeURIComponent(
        joke
      )}`;
      history.replaceState(null, null, url);
    },
  });

  colorPublisher.subscribe({
    update: (color) => {
      const url = `ecommerce.html?type=${urlParams.get(
        "type"
      )}&color=${color}&joke=${encodeURIComponent(joke)}`;
      history.replaceState(null, null, url);
    },
  });

  jokePublisher.subscribe({
    update: (joke) => {
      const url = `ecommerce.html?type=${urlParams.get(
        "type"
      )}&color=${urlParams.get("color")}&joke=${encodeURIComponent(joke)}`;
      history.replaceState(null, null, url);
    },
  });

  if (!joke) {
    joke = localStorage.getItem("joke");
  }

  if (joke) {
    updateSelectedJoke(joke);
  }

  const generateJokeBtn = document.getElementById("random-joke-btn");
  if (generateJokeBtn) {
    generateJokeBtn.addEventListener("click", generateRandomJoke);
  }

  function storeJoke() {
    localStorage.setItem("joke", joke);
  }

  window.addEventListener("beforeunload", storeJoke);

  if (urlParams.has("jokeId")) {
    const jokeId = urlParams.get("jokeId");
    fetchJokeById(jokeId);
  }

  updateProductDetails();
});