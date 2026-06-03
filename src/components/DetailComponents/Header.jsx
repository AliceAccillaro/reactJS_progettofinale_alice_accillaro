export default function Header({ game }) {
  const platforms = game.platforms
    ?.slice(0, 4)
    .map(({ platform }) => platform.name)
    .join(", ");
  const rating =
    typeof game.rating === "number" ? `${game.rating.toFixed(1)}/5` : "N/A";

  return (
    <header className="detail-grid">
      <article className="panel">
        <p className="eyebrow">Game dossier</p>
        <h1 className="page-title">{game.name}</h1>
        <p className="detail-copy">{game.description_raw}</p>

        <div className="tag-row">
          {game.genres.map((genre) => {
            return (
              <span className="genre-tag" key={genre.id}>
                {genre.name}
              </span>
            );
          })}
        </div>
      </article>

      <aside className="detail-aside">
        <div className="info-card">
          <div className="info-card__row">
            <p className="info-label">Release</p>
            <p className="info-value">{game.released ?? "TBA"}</p>
          </div>

          <div className="info-card__row">
            <p className="info-label">Rating</p>
            <p className="info-value">{rating}</p>
          </div>

          <div className="info-card__row">
            <p className="info-label">Metacritic</p>
            <p className="info-value">{game.metacritic ?? "N/A"}</p>
          </div>

          <div className="info-card__row">
            <p className="info-label">Platforms</p>
            <p className="info-value">{platforms ?? "Not available"}</p>
          </div>
        </div>

        <div className="media-frame">
          <img
            src={game.background_image_additional ?? game.background_image}
            alt={game.name}
          />
        </div>
      </aside>
    </header>
  );
}
