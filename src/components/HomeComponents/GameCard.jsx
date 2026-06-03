import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  const releaseYear = game.released ? game.released.slice(0, 4) : "TBA";
  const rating =
    typeof game.rating === "number" ? `${game.rating.toFixed(1)}/5` : "NR";
  const genres =
    game.genres?.slice(0, 2).map((genre) => genre.name).join(" / ") ??
    "Explore the dossier";

  return (
    <Link to={`/detail/${game.id}`}>
      <article className="game-card">
        <img
          src={game.background_image}
          className="game-card__image"
          alt={game.name}
        />

        <div className="game-card__content">
          <div className="game-card__meta">
            <span>{releaseYear}</span>
            <span>{rating}</span>
          </div>

          <h3 className="game-card__title">{game.name}</h3>
          <p className="game-card__subtitle">{genres}</p>
          <span className="game-card__cta">Open dossier</span>
        </div>
      </article>
    </Link>
  );
}
