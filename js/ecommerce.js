// @ts-nocheck
import { getRandomJoke, getJokeById } from "../modules/api.js";
import { updateProductDetails } from "./productDetails.js";
import { updateSelectedJoke } from "./updateSelectJokes.js";
import { handleProductLinkClick } from "./eventHandlers.js";
import { jokePublisher } from "../modules/updateProduct.js";

const selectedJokeElement = document.getElementById("selected-joke");
const urlParams = new URLSearchParams(window.location.search);
const selectedJokeId = urlParams.get("joke");

document.addEventListener("DOMContentLoaded", () => {
  const otherProductLinks = document.querySelectorAll(".other-products a");
  otherProductLinks.forEach((link) => {
    handleProductLinkClick(link, selectedJokeId);
  });

  updateProductDetails();

  if (selectedJokeId) {
    getJokeById(selectedJokeId)
      .then((joke) => {
        selectedJokeElement.textContent = joke;
        updateSelectedJoke(joke);
      })
      .catch((error) => {
        console.log(error);
        selectedJokeElement.textContent = "Error al obtener el chiste";
      });
  }
});

const randomJokeButton = document.getElementById("random-joke-button");
if (randomJokeButton) {
  randomJokeButton.addEventListener("click", () => {
    getRandomJoke()
      .then((newJoke) => {
        const jokeId = newJoke.id;
        const jokeText = newJoke.joke;
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("joke", jokeId);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, "", newUrl);
        updateProductDetails();
        selectedJokeElement.textContent = jokeText;
        updateSelectedJoke(jokeText);
        jokePublisher.notify(newJoke);
      })
      .catch((error) => {
        console.log(error);
        selectedJokeElement.textContent = "Error al obtener el chiste";
      });
  });
}