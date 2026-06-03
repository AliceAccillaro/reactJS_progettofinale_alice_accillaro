import { useLoaderData } from "react-router-dom";
import GameList from "../components/HomeComponents/GameList";

export default function Homepage() {
  const { results } = useLoaderData();

  return (
    <>
      <section className="catalog-header">
        <div className="catalog-header__content">
          <p className="eyebrow">Control room</p>
          <h1 className="catalog-header__title">Anteprima giochi subito in primo piano.</h1>
          <p className="catalog-header__copy">
            Il catalogo parte immediatamente qui, mentre i generi restano nella sidebar a sinistra come filtro principale.
          </p>
        </div>
        <div className="hero-stats">
          <span className="stat-chip">{results.length} release monitorate</span>
          <span className="stat-chip">Sidebar generi sempre presente</span>
        </div>
      </section>

      {results.length ? (
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
      ) : (
        <div className="empty-state">
          Nessun gioco disponibile al momento. Ricarica piu tardi per vedere il feed aggiornato.
        </div>
      )}
    </>
  );
}
