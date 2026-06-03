import { Outlet, useLoaderData } from "react-router-dom";

import Navbar from "../components/LayoutComponents/Navbar";
import Footer from "../components/LayoutComponents/Footer";
import Sidebar from "../components/LayoutComponents/Sidebar";

export default function Layout() {
  const genres = useLoaderData();

  return (
    <div className="app-shell">
      <Navbar />

      <section className="content-shell">
        <div>
          <Sidebar genres={genres} />
        </div>

        <div className="page-slot">
          <Outlet />
        </div>
      </section>

      <Footer />
    </div>
  );
}
