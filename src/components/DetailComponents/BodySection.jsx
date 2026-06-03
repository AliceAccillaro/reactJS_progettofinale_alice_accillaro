import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import supabase from "../../database/supabase";
import { useEffect, useState } from "react";

export default function BodySection({ game, profile_id }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [description, setDescription] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [checkReview, setCheckReview] = useState(false);

  const handle_description = (e) => {
    setDescription(e.target.value);
  };

  const add_review = async () => {
    await supabase
      .from("reviews")
      .insert([
        {
          profile_id,
          game_id: game.id,
          game_name: game.name,
          description,
        },
      ])
      .select();

    setDescription("");
    setCheckReview((currentValue) => !currentValue);
  };

  const add_game = async () => {
    await supabase
      .from("favourites")
      .insert([{ profile_id, game_id: game.id, game_name: game.name }])
      .select();

    setIsFavourite(true);
  };

  const remove_game = async () => {
    await supabase
      .from("favourites")
      .delete()
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);

    setIsFavourite(false);
  };

  useEffect(() => {
    let isMounted = true;

    const syncGameData = async () => {
      const { data: favourites } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile_id)
        .eq("game_id", game.id);

      if (isMounted) {
        setIsFavourite((favourites ?? []).length > 0);
      }

      const { data: reviews } = await supabase
        .from("reviews")
        .select("*")
        .eq("game_id", game.id);

      if (isMounted) {
        setGameReviews(reviews ?? []);
      }
    };

    syncGameData();

    return () => {
      isMounted = false;
    };
  }, [checkReview, game.id, profile_id]);

  return (
    <section className="detail-lower-grid">
      <div className="panel">
        <p className="eyebrow">Community tools</p>
        <h2 className="section-title">Lascia il tuo segnale</h2>
        <p className="page-subtitle">
          Salva il gioco nella tua collezione e pubblica una recensione rapida.
        </p>

        <button
          type="button"
          className={`favorite-toggle ${isFavourite ? "is-active" : ""}`}
          onClick={isFavourite ? remove_game : add_game}
        >
          {isFavourite ? <FaHeart /> : <FaRegHeart />}
          {isFavourite ? "Gia nei preferiti" : "Aggiungi ai preferiti"}
        </button>

        <label className="field-label" htmlFor="review-field">
          Review
        </label>
        <textarea
          id="review-field"
          className="field text-area"
          placeholder="Scrivi la tua impressione sul gioco..."
          onChange={handle_description}
          value={description}
        />

        <button
          className="accent-button"
          onClick={add_review}
          disabled={!description.trim()}
        >
          Pubblica recensione
        </button>
      </div>

      <div className="panel">
        <div className="reviews-head">
          <div>
            <p className="eyebrow">Live feed</p>
            <h2 className="section-title">Recensioni del gioco</h2>
          </div>

          <span className="stat-chip">{gameReviews.length} feedback</span>
        </div>

        <div className="reviews-list">
          {gameReviews.length ? (
            gameReviews.map((review) => {
              return (
                <article key={review.id} className="review-card">
                  <p>{review.description}</p>
                </article>
              );
            })
          ) : (
            <div className="empty-state">
              Nessuna recensione ancora. La prima potrebbe essere la tua.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
