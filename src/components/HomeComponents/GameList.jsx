import GameCard from "./GameCard";

export default function GameList({ children }) {
  return (
    <main className="game-grid">{children}</main>
  );
}

GameList.Card = GameCard;
