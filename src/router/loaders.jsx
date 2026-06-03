export async function getAllGamesLoader() {
  try {
    const promise = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2024-01-01,2024-12-30&page_size=20`
    );

    const json = await promise.json();

    return json;
  } catch (error) {
    console.log("ERRORE GAMES:", error);
    return { results: [] };
  }
}

export async function getSearchedGames({ params }) {
  try {
    const promise = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${params.slug}&page_size=20`
    );

    const json = await promise.json();

    return json;
  } catch (error) {
    console.log("ERRORE SEARCH:", error);
    return { results: [] };
  }
}

export async function getAllGenres() {
  try {
    const promise = await fetch(
      `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`
    );

    const json = await promise.json();

    return json.results;
  } catch (error) {
    console.log("ERRORE GENERI:", error);
    return [];
  }
}

export async function getFilteredByGenreGames({ params }) {
  try {
    const promise = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&genres=${params.slug}`
    );

    const json = await promise.json();

    return json.results;
  } catch (error) {
    console.log("ERRORE GAMES PER GENERE:", error);
    return [];
  }
}

export async function getGameDetails({ params }) {
  const promise = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_API_KEY}`
  );

  const json = await promise.json();

  return json;
}