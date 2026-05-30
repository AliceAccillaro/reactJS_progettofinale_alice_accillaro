import { Link } from "react-router-dom";

export default function Sidebar({ genres }) {
  return (
    <>
      <nav className="min-h-screen bg-base-300 p-5">

        <h2 className="font-electro text-2xl mb-6">
          Genres
        </h2>

        <ul className="space-y-2">

          {genres.map((genre) => {
            return (
              <li key={genre.id}>

                <Link
                  to={`/genre/${genre.slug}`}
                  className="
                    block
                    px-3
                    py-2
                    rounded-lg
                    transition
                    hover:bg-primary
                    hover:text-white
                  "
                >
                  {genre.name}
                </Link>

              </li>
            );
          })}

        </ul>

      </nav>
    </>
  );
}