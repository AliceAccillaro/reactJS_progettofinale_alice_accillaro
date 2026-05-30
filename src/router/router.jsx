import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Homepage from "../views/Homepage";
import routes from "./routes";
import { getAllGamesLoader } from "./loaders";
import SearchPage from "../views/SearchPage";
import { getSearchedGames } from "./loaders";
import GenrePage from "../views/GenrePage";
import { getFilteredByGenreGames } from "./loaders";
import { getAllGenres } from "./loaders";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Layout,
    loader: getAllGenres,
    children: [
      {
        path: routes.home,
        Component: Homepage,
        loader: getAllGamesLoader,
      },
      {
        path: routes.search,
        Component: SearchPage,
        loader: getSearchedGames
      },
      {
        path: routes.genre,
        Component: GenrePage,
        loader: getFilteredByGenreGames
      }
    ],
  },
]);

export default router;