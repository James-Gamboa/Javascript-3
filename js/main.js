import { setupRandomJokeButton } from "../modules/randomJoke.js";
import { setupSearchForm } from "../modules/searchJoke.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  setupRandomJokeButton(urlParams);
  setupSearchForm();
});
