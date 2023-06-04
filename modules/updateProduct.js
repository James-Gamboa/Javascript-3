import { Publisher } from "../config/observer.js";

export function handleProductUpdate(selectedJoke) {
  const urlParams = new URLSearchParams(window.location.search);
  const url = `ecommerce.html?type=${urlParams.get("type")}&color=${urlParams.get("color")}&joke=${selectedJoke}`;
  history.pushState(null, null, url);
}

export function handleColorUpdate(color) {
  const urlParams = new URLSearchParams(window.location.search);
  const url = `ecommerce.html?type=${urlParams.get("type")}&color=${color}&joke=${urlParams.get("joke")}`;
  history.pushState(null, null, url);
}


export function handleJokeUpdate(joke) {
  const urlParams = new URLSearchParams(window.location.search);
  const typeValue = urlParams.get("type") || "shirt";
  const colorValue = urlParams.get("color") || "white";
  const url = `ecommerce.html?type=${typeValue}&color=${colorValue}&joke=${joke}`;
  history.pushState(null, null, url);
}

export const productPublisher = new Publisher();
export const colorPublisher = new Publisher();
export const jokePublisher = new Publisher();

productPublisher.subscribe({
  update: handleProductUpdate,
});

colorPublisher.subscribe({
  update: handleColorUpdate,
});

jokePublisher.subscribe({
  update: handleJokeUpdate,
});