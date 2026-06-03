import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import routes from "../../router/routes";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const onSubmit = async (user_data) => {
    const { error } = await login({
      email: user_data.email,
      password: user_data.password,
    });

    if (error) {
      return;
    }

    navigate("/");
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <article className="auth-showcase">
          <p className="eyebrow">Member access</p>
          <h1 className="form-title">Rientra nella control room.</h1>
          <p className="form-subtitle">
            Accedi per gestire i preferiti, modificare il profilo e scrivere recensioni nel tuo archivio personale.
          </p>
          <ul className="showcase-list">
            <li>Salva i giochi da tenere d'occhio</li>
            <li>Tieni il tuo profilo coerente con il nuovo look del sito</li>
            <li>Interagisci con le schede dettaglio in modo immediato</li>
          </ul>
        </article>

        <form className="form-panel" onSubmit={handleSubmit(onSubmit)}>
          <p className="eyebrow">Login</p>
          <h2 className="form-title">Bentornato</h2>
          <p className="form-subtitle">
            Inserisci le credenziali e riprendi l'esplorazione.
          </p>

          <label className="field-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            className="field"
            {...register("email", {
              required: "This field is required",
            })}
          />

          {errors.email && (
            <p role="alert" className="field-error">
              {errors.email.message}
            </p>
          )}

          <label className="field-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="Your password"
            className="field"
            {...register("password", {
              required: "This field is required",
            })}
          />

          {errors.password && (
            <p role="alert" className="field-error">
              {errors.password.message}
            </p>
          )}

          <button className="accent-button" type="submit">
            Sign in
          </button>

          <p className="form-footnote">
            Non hai ancora un account?{" "}
            <Link to={routes.register} className="inline-link">
              Registrati qui
            </Link>
            .
          </p>
        </form>
      </section>
    </main>
  );
}
