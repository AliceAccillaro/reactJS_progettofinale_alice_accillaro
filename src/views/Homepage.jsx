import { useLoaderData } from "react-router-dom";
import GameList from "../components/HomeComponents/GameList";

export default function Homepage() {
  const { results } = useLoaderData();

  return (
    <>
      <h1 className="font-electro text-3xl text-center font-bold my-5">
        Rehacktor
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