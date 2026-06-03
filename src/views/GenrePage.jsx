import { useLoaderData, useParams } from "react-router-dom";
import GameList from "../components/HomeComponents/GameList";

export default function GenrePage() {
  const games = useLoaderData();
  const { slug } = useParams();
  const label = slug.replaceAll("-", " ");

  return (
    <>
      <section className="catalog-header">
        <div className="catalog-header__content">
          <p className="eyebrow">Genre view</p>
          <h1 className="catalog-header__title">Filtro attivo: {label}</h1>
          <p className="catalog-header__copy">
            I generi restano obbligatoriamente nel pannello laterale sinistro e questa sezione introduce il filtro senza rubare spazio alla preview giochi.
          </p>
        </div>
        <div className="hero-stats">
          <span className="stat-chip">{games.length} titoli in evidenza</span>
          <span className="stat-chip">Preview subito sotto</span>
        </div>
      </section>

      {games.length ? (
        <GameList>
          {games.map((game) => {
            return (
              <GameList.Card
                key={game.id}
                game={game}
              />
            );
          })}
        </GameList>
      ) : (
        <div className="empty-state">
          Questo filtro non ha prodotto risultati. Cambia genere e continua l'esplorazione.
        </div>
      )}
    </>
  );
}
