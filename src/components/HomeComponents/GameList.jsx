import GameCard from "./GameCard";

export default function GameList({ children }) {
  return (
    <>
      <main className="grid grid-cols-4 gap-4 px-5">
        {children}
      </main>
    </>
  );
}

GameList.Card = GameCard;