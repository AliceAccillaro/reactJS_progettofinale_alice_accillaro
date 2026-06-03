import { useLoaderData, useParams } from "react-router-dom";
import GameList from "../components/HomeComponents/GameList";

export default function SearchPage() {
  const { results } = useLoaderData();
  const { slug } = useParams();
  const label = slug.replaceAll("-", " ");

  return (
    <>
      <section className="catalog-header">
        <div className="catalog-header__content">
          <p className="eyebrow">Search result</p>
          <h1 className="catalog-header__title">Risultati per "{label}"</h1>
          <p className="catalog-header__copy">
            La sidebar dei generi resta a sinistra, mentre qui sopra trovi solo un'intestazione compatta prima della griglia giochi.
          </p>
        </div>
        <div className="hero-stats">
          <span className="stat-chip">{results.length} giochi trovati</span>
          <span className="stat-chip">Ricerca live dal catalogo RAWG</span>
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
          Nessun risultato per questa ricerca. Prova un titolo piu ampio o un altro genere.
        </div>
      )}
    </>
  );
}
