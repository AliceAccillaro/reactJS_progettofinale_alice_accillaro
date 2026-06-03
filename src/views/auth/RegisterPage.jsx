import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import routes from "../../router/routes";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (user_data) => {
    await signUp({
      email: user_data.email,
      password: user_data.password,
      options: {
        data: {
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          username: user_data.username,
        },
      },
    });

    navigate("/");
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <article className="auth-showcase">
          <p className="eyebrow">New player</p>
          <h1 className="form-title">Crea il tuo spazio dentro Rehacktor.</h1>
          <p className="form-subtitle">
            Il nuovo design funziona meglio quando ogni profilo ha una presenza chiara, personale e pronta a collezionare giochi.
          </p>
          <ul className="showcase-list">
            <li>Configura nome, username e accesso in pochi secondi</li>
            <li>Prepara il profilo per avatar, preferiti e recensioni</li>
            <li>Entra subito nella parte community del sito</li>
          </ul>
        </article>

        <form className="form-panel" onSubmit={handleSubmit(onSubmit)}>
          <p className="eyebrow">Register</p>
          <h2 className="form-title">Apri un nuovo account</h2>
          <p className="form-subtitle">
            Compila i campi qui sotto per attivare la tua identita nel catalogo.
          </p>

          <label className="field-label" htmlFor="register-name">
            Nome
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Nome"
            className="field"
            {...register("first_name", {
              required: "This field is required",
            })}
          />

          {errors.first_name && (
            <p role="alert" className="field-error">
              {errors.first_name.message}
            </p>
          )}

          <label className="field-label" htmlFor="register-lastname">
            Cognome
          </label>
          <input
            id="register-lastname"
            type="text"
            placeholder="Cognome"
            className="field"
            {...register("last_name", {
              required: "This field is required",
            })}
          />

          {errors.last_name && (
            <p role="alert" className="field-error">
              {errors.last_name.message}
            </p>
          )}

          <label className="field-label" htmlFor="register-username">
            Username
          </label>
          <input
            id="register-username"
            type="text"
            placeholder="Username"
            className="field"
            {...register("username", {
              required: "This field is required",
            })}
          />

          {errors.username && (
            <p role="alert" className="field-error">
              {errors.username.message}
            </p>
          )}

          <label className="field-label" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
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

          <label className="field-label" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="Minimo 8 caratteri"
            className="field"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {errors.password && (
            <p role="alert" className="field-error">
              {errors.password.message}
            </p>
          )}

          <button className="accent-button" type="submit">
            Crea account
          </button>

          <p className="form-footnote">
            Hai gia un account?{" "}
            <Link to={routes.login} className="inline-link">
              Vai al login
            </Link>
            .
          </p>
        </form>
      </section>
    </main>
  );
}
