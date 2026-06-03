import { Outlet } from "react-router-dom";

import Navbar from "../components/LayoutComponents/Navbar";
import Footer from "../components/LayoutComponents/Footer";

export default function AuthenticationLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
