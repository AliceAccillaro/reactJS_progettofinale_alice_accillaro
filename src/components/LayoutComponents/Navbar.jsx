import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import routes from "../../router/routes";
import { UserContext } from "../../context/userContext";

export default function Navbar() {
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const { user, profile, signOut } = useContext(UserContext);

  const handleChange = (e) => {
    setSlug(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const value = slug.trim();

    if (!value) {
      return;
    }

    navigate(`/search/${value}`);
  };

  const handleLogout = async () => {
    await navigate("/");
    signOut();
  };

  return (
    <div className="topbar-wrap">
      <nav className="topbar">
        <div className="brand-lockup">
          <Link to={routes.home} className="brand-mark">
            R
          </Link>

          <div>
            <Link
              to={routes.home}
              className="brand-title"
            >
              Rehacktor
            </Link>

            <p className="brand-subtitle">
              Arcade archive for curious players
            </p>
          </div>
        </div>

        <div className="nav-cluster">
          <div className="nav-links">
            <Link to={routes.home} className="nav-link">
              Discover
            </Link>

            <Link to={routes.profile} className="nav-link">
              Profilo
            </Link>

            {!user ? (
              <>
                <Link to={routes.login} className="nav-link">
                  Login
                </Link>

                <Link
                  to={routes.register}
                  className="nav-link nav-link--primary"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="welcome-pill">
                  <span className="welcome-pill__label">Profilo attivo</span>
                  <span className="welcome-pill__name">
                    {profile?.first_name ?? "Player"}
                  </span>
                </span>

                <button
                  onClick={handleLogout}
                  className="nav-link nav-link--danger"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Cerca un gioco, un brand, un mood..."
              className="search-input"
              onChange={handleChange}
              value={slug}
            />

            <button
              type="submit"
              className="search-submit"
              aria-label="Search games"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
