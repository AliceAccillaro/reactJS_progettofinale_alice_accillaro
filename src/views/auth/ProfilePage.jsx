import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import routes from "../../router/routes";
import supabase from "../../database/supabase";

const Ryu = "https://placehold.co/100x100";

export default function ProfilePage() {
  const { user, profile } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState();
  const [userFavourites, setUserFavourites] = useState([]);

  useEffect(() => {
    if (!profile) {
      return;
    }

    let isMounted = true;
    let nextAvatarUrl;

    const loadProfileData = async () => {
      if (profile.avatar_url) {
        const { data } = await supabase.storage
          .from("avatars")
          .download(profile.avatar_url);

        if (data) {
          nextAvatarUrl = URL.createObjectURL(data);

          if (isMounted) {
            setAvatarUrl(nextAvatarUrl);
          }
        }
      }

      const { data: favourites } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile.id);

      if (isMounted) {
        setUserFavourites(favourites ?? []);
      }
    };

    loadProfileData();

    return () => {
      isMounted = false;

      if (nextAvatarUrl) {
        URL.revokeObjectURL(nextAvatarUrl);
      }
    };
  }, [profile]);

  if (!user || !profile) {
    return (
      <main className="profile-shell">
        <section className="panel">
          <p className="eyebrow">Profile locked</p>
          <h1 className="section-title">Accedi per vedere il tuo profilo.</h1>
          <p className="page-subtitle">
            Dopo il login potrai personalizzare avatar, dati personali e raccolta preferiti.
          </p>
          <Link to={routes.login} className="accent-button">
            Vai al login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="profile-shell">
      <section className="profile-banner">
        <img
          src={avatarUrl ?? Ryu}
          className="profile-avatar"
          alt="Profile Image"
        />

        <div>
          <p className="eyebrow">Pilot profile</p>
          <h1 className="page-title">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="page-subtitle">
            @{profile.username} | {user.email}
          </p>
          <div className="hero-stats">
            <span className="stat-chip">
              {userFavourites?.length ?? 0} preferiti
            </span>
            <span className="stat-chip">Profilo attivo</span>
          </div>
        </div>
      </section>

      <section className="profile-grid">
        <article className="panel">
          <p className="eyebrow">Identity card</p>
          <h2 className="section-title">I tuoi dati</h2>
          <p className="page-subtitle">
            Qui trovi le informazioni principali del profilo usato nel sito.
          </p>

          <div className="reviews-list">
            <div className="review-card">
              <p>
                <strong>Nome:</strong> {profile.first_name} {profile.last_name}
              </p>
            </div>

            <div className="review-card">
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
            </div>

            <div className="review-card">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          <Link to={routes.profile_settings} className="accent-button">
            Apri impostazioni
          </Link>
        </article>

        <article className="panel">
          <p className="eyebrow">Status</p>
          <h2 className="section-title">Pronto per continuare l'esplorazione</h2>
          <p className="page-subtitle">
            Il nuovo layout del profilo mette in evidenza identita, raccolta e accesso rapido alle impostazioni.
          </p>
          <div className="hero-stats">
            <span className="stat-chip">Avatar configurabile</span>
            <span className="stat-chip">Preferiti sempre visibili</span>
            <span className="stat-chip">Scheda pulita e leggibile</span>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="reviews-head">
          <div>
            <p className="eyebrow">Collection</p>
            <h2 className="section-title">I tuoi giochi preferiti</h2>
          </div>
          <span className="stat-chip">{userFavourites?.length ?? 0} salvati</span>
        </div>

        {userFavourites?.length ? (
          <div className="favorite-grid">
            {userFavourites.map((game) => {
              return (
                <article className="favorite-card" key={game.id}>
                  <p className="info-label">Favourite</p>
                  <p className="info-value">{game.game_name}</p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            Non hai ancora salvato giochi. Apri una scheda dettaglio e aggiungine uno ai preferiti.
          </div>
        )}
      </section>
    </main>
  );
}
