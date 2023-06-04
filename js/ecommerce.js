import { getRandomJoke, getJokeById } from "../modules/api.js";
import { updateProductDetails } from "./productDetails.js";
import { updateSelectedJoke } from "./joke.js";
import { handleProductLinkClick } from "./eventHandlers.js";
import { jokePublisher } from "../modules/updateProduct.js";

const selectedJokeElement = document.getElementById("selected-joke");
const urlParams = new URLSearchParams(window.location.search);
let selectedJoke = urlParams.get("joke");

function storeSelectedJoke(jokeId) {
  if (jokeId) {
    localStorage.setItem("selectedJoke", jokeId);
  } else {
    localStorage.removeItem("selectedJoke");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const otherProductLinks = document.querySelectorAll(".other-products a");
  otherProductLinks.forEach((link) => {
    handleProductLinkClick(link, selectedJoke);
  });

  function storeJokeId() {
    const urlParams = new URLSearchParams(window.location.search);
    const jokeId = urlParams.get("joke");
    if (jokeId !== "undefined") {
      selectedJoke = jokeId;
      selectedJokeElement.textContent = jokeId;
      storeSelectedJoke(jokeId);
    }
  }

  window.addEventListener("beforeunload", storeJokeId);

  updateProductDetails("white", selectedJoke);

  if (selectedJoke) {
    selectedJokeElement.textContent = selectedJoke;
    updateSelectedJoke(selectedJoke);
  }
});

const storedJokeId = localStorage.getItem("selectedJoke");
if (storedJokeId) {
  getJokeById(storedJokeId)
    .then((newJoke) => {
      selectedJoke = newJoke;
      selectedJokeElement.textContent = newJoke;
      updateSelectedJoke(newJoke);
      jokePublisher.notify(newJoke);
    })
    .catch((error) => {
      console.log(error);
      selectedJokeElement.textContent = "Error al obtener el chiste";
    });
}

const randomJokeButton = document.getElementById("random-joke-button");
if (randomJokeButton) {
  randomJokeButton.addEventListener("click", () => {
    getRandomJoke()
      .then((newJoke) => {
        selectedJoke = newJoke;
        selectedJokeElement.textContent = newJoke;
        updateSelectedJoke(newJoke);
        jokePublisher.notify(newJoke);
        storeSelectedJoke(newJoke);
      })
      .catch((error) => {
        console.log(error);
        selectedJokeElement.textContent = "Error al obtener el chiste";
      });
  });
}