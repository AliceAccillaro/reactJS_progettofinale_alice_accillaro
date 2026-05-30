import { createContext, useEffect, useState } from "react";
import supabase from "../database/supabase";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setUser(null);
      setProfile(null);
      return;
    }

    setUser(session.user);

    const { data: profiles } = await supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id);

    setProfile(profiles?.[0] ?? null);
  };

  useEffect(() => {
    getUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const signUp = async (newUser) => {
    const { data, error } = await supabase.auth.signUp(newUser);

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);

    await getUser();

    return { data, error };
  };

  const login = async (loggedUser) => {
    const { data, error } = await supabase.auth.signInWithPassword(loggedUser);

    console.log("LOGIN DATA:", data);
    console.log("LOGIN ERROR:", error);

    if (!error) {
      await getUser();
    }

    return { data, error };
  };

  return (
    <UserContext.Provider
      value={{ user, profile, signOut, signUp, login, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
}