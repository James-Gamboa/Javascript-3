// @ts-nocheck
import { jokePublisher } from "../modules/updateProduct.js";

export function updateSelectedJoke(joke) {
  const selectedJokeElement = document.getElementById("selected-joke");
  selectedJokeElement.textContent = joke;
  jokePublisher.notify(joke);
}
