import { useLoaderData, useNavigate } from "react-router";
import Header from "../components/DetailComponents/Header";
import { FaCircleArrowLeft } from "react-icons/fa6";
import BodySection from "../components/DetailComponents/BodySection";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function DetailPage() {
  const game = useLoaderData();
  const navigate = useNavigate();
  const { profile } = useContext(UserContext);

  return (
    <main
      style={{
        backgroundImage: `linear-gradient(rgba(4, 11, 20, 0.88), rgba(4, 11, 20, 0.92)), url(${game.background_image})`,
      }}
      className="detail-shell"
    >
      <button
        type="button"
        className="ghost-button back-button"
        onClick={() => navigate(-1)}
      >
        <FaCircleArrowLeft />
        Torna al catalogo
      </button>

      <Header game={game} />

      {profile ? (
        <BodySection
          game={game}
          profile_id={profile.id}
        />
      ) : (
        <section className="panel">
          <p className="eyebrow">Community access</p>
          <h2 className="section-title">Accedi per salvare questo gioco e scrivere una recensione.</h2>
          <p className="page-subtitle">
            La scheda resta navigabile da ospite, ma le funzioni community si sbloccano dopo il login.
          </p>
        </section>
      )}
    </main>
  );
}
