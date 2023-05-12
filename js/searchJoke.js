function searchJokes(keyword) {
  return fetch(`https://icanhazdadjoke.com/search?term=${keyword}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const jokes = data.results;
      const resultsList = [];
      if (jokes.length === 0) {
        resultsList.push("No hubo resultados");
      } else {
        jokes.forEach((joke) => {
          resultsList.push(joke.joke);
        });
      }
      return resultsList;
    });
}

export default searchJokes;