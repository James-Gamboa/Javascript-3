import getRandomJoke from "./randomJoke.js";
import searchJokes from "./searchJoke.js";

const randomJokeBtn = document.getElementById("random-joke-btn");
const searchForm = document.getElementById("search-form");
const searchResults = document.getElementById("search-results");

randomJokeBtn.addEventListener("click", () => {
  getRandomJoke().then((joke) => {
    const jokeElement = document.getElementById("random-joke");
    jokeElement.textContent = joke;
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("search-input");
  const keyword = searchInput.value.trim();
  if (keyword) {
    searchJokes(keyword).then((results) => {
      const resultList = results.map((result) => `<li>${result}</li>`);
      searchResults.innerHTML = `<ul>${resultList.join("")}</ul>`;
    })
    .catch((error) => {
      console.log(error);
      searchResults.innerHTML = "<li>No se pudieron cargar los chistes</li>";
    });
  }
});