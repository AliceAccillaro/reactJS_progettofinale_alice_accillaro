import { useLoaderData, useParams } from "react-router-dom";
import GameList from "../components/HomeComponents/GameList";

export default function SearchPage() {
  const { results } = useLoaderData();
  const { slug } = useParams();

  return (
    <>
      <h1 className="text-center text-3xl mt-10">
        Search by slug: {slug}
      </h1>

      <GameList>
        {results.map((game) => {
          return (
            <GameList.Card
              key={game.id}
              game={game}
            />
          );
        })}
      </GameList>
    </>
  );
}