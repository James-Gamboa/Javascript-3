// @ts-nocheck
import { searchJokes } from "./api.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultsContainer = document.querySelector("#search-results");

function showResults(results) {
  resultsContainer.textContent = "";

  if (results.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No se encontraron resultados.";
    resultsContainer.appendChild(noResultsMessage);
    return;
  }

  const resultList = document.createElement("ul");
  results.forEach((result) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    const jokeUrl = `ecommerce.html?joke=${encodeURIComponent(result.id)}`;
    link.href = jokeUrl;
    link.textContent = result.joke;
    listItem.appendChild(link);
    resultList.appendChild(listItem);
  });
  resultsContainer.appendChild(resultList);
}



export function setupSearchForm() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
      resultsContainer.textContent =
        "Por favor, ingresa un término de búsqueda válido.";
      return;
    }

    searchJokes(searchTerm)
      .then((results) => {
        showResults(results);
      })
      .catch((error) => {
        resultsContainer.textContent = "Ocurrió un error al buscar bromas.";
        console.error(error);
      });
  });
}