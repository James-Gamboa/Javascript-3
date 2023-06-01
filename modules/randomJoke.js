import { getRandomJoke } from "./api.js";

const jokeContainer = document.getElementById("random-joke");

export function displayJoke(joke) {
  jokeContainer.innerHTML = `<a href="ecommerce.html?joke=${encodeURIComponent(joke)}">${joke}</a>`;
}

export function setupRandomJokeButton() {
  const randomJokeButton = document.getElementById("random-joke-button");
  randomJokeButton.addEventListener("click", () => {
    getRandomJoke()
      .then((joke) => {
        displayJoke(joke);
      })
      .catch((error) => {
        console.error("Error al obtener la broma aleatoria:", error);
      });
  });

  return randomJokeButton;
}