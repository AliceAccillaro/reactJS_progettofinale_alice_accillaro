import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import routes from "../../router/routes";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
  const [slug, setSlug] = useState("");

  const navigate = useNavigate();

  const { user, profile, signOut } = useContext(UserContext);

  const handleChange = (e) => {
    setSlug(e.target.value);
  };

  const handleLogout = async () => {
    await navigate("/");
    signOut();
  };

  return (
    <div className="navbar bg-base-200 px-8 shadow-sm">
      <div className="flex-1">
        <Link
          to={routes.home}
          className="btn btn-ghost text-3xl font-electro"
        >
          Rehacktor
        </Link>
        <Link          to={routes.profile}
          className="btn btn-ghost text-lg font-medium"
        >
          Profilo
        </Link>
      </div>

      <div className="flex gap-3 mr-10 items-center">
        {!user ? (
          <>
            <Link
              to={routes.login}
              className="btn btn-ghost text-lg font-medium px-5"
            >
              Login
            </Link>

            <Link
              to={routes.register}
              className="btn btn-ghost text-lg font-medium px-5"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-lg font-medium">
              Benvenuto {profile?.first_name}
            </span>

            <button
              onClick={handleLogout}
              className="btn btn-ghost text-lg font-medium px-5"
            >
              Logout
            </button>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
          onChange={handleChange}
        />

        <Link className="btn btn-square" to={`/search/${slug}`}>
          <FaSearch />
        </Link>
      </div>
    </div>
  );
}