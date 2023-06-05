import { Publisher } from "../config/observer.js";

export const productPublisher = new Publisher();
export const colorPublisher = new Publisher();
export const jokePublisher = new Publisher();

productPublisher.subscribe({
  update: (selectedJoke) => {
    const urlParams = new URLSearchParams(window.location.search);
    const colorValue = urlParams.get("color") || "white";
    const jokeValue = urlParams.get("joke") || selectedJoke;
    const url = `ecommerce.html?type=${urlParams.get("type")}&color=${colorValue}&joke=${jokeValue}`;
    localStorage.setItem("selectedJoke", jokeValue);
  },
});


colorPublisher.subscribe({
  update: (color) => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeValue = urlParams.get("type") || "shirt";
    const jokeValue = urlParams.get("joke") || "";
    const url = `ecommerce.html?type=${typeValue}&color=${color}&joke=${jokeValue}`;
  },
});

jokePublisher.subscribe({
  update: (joke) => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeValue = urlParams.get("type") || "shirt";
    const colorValue = urlParams.get("color") || "white";
    const url = `ecommerce.html?type=${typeValue}&color=${colorValue}&joke=${joke?.id}`;
  },
});