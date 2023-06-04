// @ts-nocheck
export function updateSelectedJoke(joke) {
  const selectedJokeElement = document.getElementById("selected-joke");
  selectedJokeElement.textContent = joke;

  const productImageContainer = document.getElementById("product-image-container");
  productImageContainer.dataset.joke = joke;
}

export function handleRandomJokeButtonClick() {
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
}

export function fetchJokeById(jokeId) {
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
