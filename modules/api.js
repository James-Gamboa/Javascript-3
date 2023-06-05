export async function getRandomJoke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
    },
    });
    const data = await response.json();
    const joke = {
      id: data.id,
      joke: data.joke,
    };
    return joke;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el chiste");
  }
}

export async function searchJokes(keyword) {
  try {
    const response = await fetch(`https://icanhazdadjoke.com/search?term=${keyword}`, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    const jokes = data.results.map((joke) => ({
      id: joke.id,
      joke: joke.joke,
    }));
    return jokes;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar los chistes");
  }
}

export async function getJokeById(jokeId) {
  try {
    const response = await fetch(`https://icanhazdadjoke.com/j/${jokeId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    const joke = data.joke;
    return joke;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el chiste por ID");
  }
}
