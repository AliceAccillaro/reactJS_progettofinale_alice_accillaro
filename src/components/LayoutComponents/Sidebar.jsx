import { Link } from "react-router-dom";

export default function Sidebar({ genres }) {
  return (
    <nav className="sidebar-panel">
      <p className="eyebrow">Filter deck</p>
      <h2 className="section-title">Generi da esplorare</h2>
      <p className="page-subtitle">
        Passa da indie a RPG, da corse a horror senza perdere il filo del catalogo.
      </p>

      <ul className="genre-list">
        {genres.map((genre) => {
          return (
            <li key={genre.id}>
              <Link
                to={`/genre/${genre.slug}`}
                className="sidebar-link"
              >
                <span>{genre.name}</span>
                <span className="sidebar-link__meta">
                  {genre.games_count ?? "Open"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
