import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import routes from "../../router/routes";
import supabase from "../../database/supabase";

export default function ProfileSettingsPage() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const previewUrlRef = useRef();

  const { profile, getUser, updateProfile } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const nextFile = e.target.files[0];

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = undefined;
    }

    if (!nextFile) {
      setFile(undefined);
      setPreview(undefined);
      return;
    }

    const imageUrl = URL.createObjectURL(nextFile);
    previewUrlRef.current = imageUrl;
    setFile(nextFile);
    setPreview(imageUrl);
  };

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    if (!file || !profile) {
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.id}${Math.random()}.${fileExt}`;

    await supabase.storage.from("avatars").upload(fileName, file);

    await supabase
      .from("profiles")
      .upsert({ id: profile.id, avatar_url: fileName })
      .select();

    await getUser();
  };

  const onSubmit = async (data) => {
    await updateProfile(data);
    navigate(routes.profile);
  };

  if (!profile) {
    return (
      <main className="profile-shell">
        <section className="panel">
          <p className="eyebrow">Settings unavailable</p>
          <h1 className="section-title">Carica prima il profilo per modificare le impostazioni.</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="profile-shell">
      <section className="page-hero">
        <p className="eyebrow">Profile settings</p>
        <h1 className="page-title">Aggiorna identita e avatar.</h1>
        <p className="page-subtitle">
          Ho portato anche questa sezione dentro il nuovo linguaggio visivo, cosi non sembra piu una schermata separata dal resto del sito.
        </p>
      </section>

      <section className="settings-grid">
        <form className="form-panel" onSubmit={handleSubmit(onSubmit)}>
          <p className="eyebrow">Identity edit</p>
          <h2 className="form-title">Dati del profilo</h2>

          <label className="field-label" htmlFor="settings-name">
            Nome
          </label>
          <input
            id="settings-name"
            type="text"
            placeholder="Name"
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

          <label className="field-label" htmlFor="settings-lastname">
            Cognome
          </label>
          <input
            id="settings-lastname"
            type="text"
            placeholder="Last Name"
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

          <label className="field-label" htmlFor="settings-username">
            Username
          </label>
          <input
            id="settings-username"
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

          <button className="accent-button" type="submit">
            Salva modifiche
          </button>
        </form>

        <div className="panel">
          <p className="eyebrow">Avatar upload</p>
          <h2 className="section-title">Aggiorna la tua immagine</h2>
          <p className="page-subtitle">
            Carica un nuovo avatar per dare ancora piu carattere al profilo.
          </p>

          <form onSubmit={handleAvatarSubmit}>
            <label className="field-label" htmlFor="settings-avatar">
              File avatar
            </label>
            <input
              id="settings-avatar"
              type="file"
              className="field"
              onChange={handleChange}
            />

            <button className="accent-button" type="submit" disabled={!file}>
              Cambia avatar
            </button>
          </form>

          {preview && (
            <div className="preview-frame">
              <img
                src={preview}
                alt="Avatar preview"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
