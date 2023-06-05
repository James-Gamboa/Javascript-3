// @ts-nocheck
import { getRandomJoke } from "./api.js";

const jokeContainer = document.getElementById("random-joke");

export function displayJoke(joke, urlParams) {
  const productType = urlParams.get("type") || "shirt";
  const productColor = urlParams.get("color") || "white";
  const jokeUrl = `ecommerce.html?type=${productType}&color=${productColor}&joke=${encodeURIComponent(joke.id)}`;
  jokeContainer.innerHTML = `<a href="${jokeUrl}">${joke.joke}</a>`;
}

export function setupRandomJokeButton(urlParams) {
  const randomJokeButton = document.getElementById("random-joke-button");
  randomJokeButton.addEventListener("click", () => {
    getRandomJoke()
      .then((joke) => {
        displayJoke(joke, urlParams);
      })
      .catch((error) => {
        console.error("Error al obtener la broma aleatoria:", error);
      });
  });

  return randomJokeButton;
}