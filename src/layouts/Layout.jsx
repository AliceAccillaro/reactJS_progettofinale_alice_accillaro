import { Outlet, useLoaderData } from "react-router-dom";

import Navbar from "../components/LayoutComponents/Navbar";
import Footer from "../components/LayoutComponents/Footer";
import Sidebar from "../components/LayoutComponents/Sidebar";

export default function Layout() {
  const genres = useLoaderData();

  return (
    <>
      <Navbar />

      <section className="grid grid-cols-7 gap-4">

        <div>
          <Sidebar genres={genres} />
        </div>

        <div className="col-span-6">
          <Outlet />
        </div>

      </section>

      <Footer />
    </>
  );
}