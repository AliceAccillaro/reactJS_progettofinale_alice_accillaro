import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <Link to={`/detail/${game.id}`}>
      <div className="h-[200px] relative cursor-pointer">

        <img
          src={game.background_image}
          className="w-full h-full brightness-50 object-cover"
          alt={game.name}
        />

        <p className="absolute bottom-0 w-full text-center text-white">
          {game.name}
        </p>

      </div>
    </Link>
  );
}