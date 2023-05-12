function getRandomJoke() {
  return fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const joke = data.joke;
      return joke;
    });
}

export default getRandomJoke;
