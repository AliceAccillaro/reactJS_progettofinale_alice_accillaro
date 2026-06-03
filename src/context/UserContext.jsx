import { useEffect, useState } from "react";
import supabase from "../database/supabase";
import { UserContext } from "./userContext";

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
    let isMounted = true;

    const syncSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

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

      if (isMounted) {
        setProfile(profiles?.[0] ?? null);
      }
    };

    syncSession();

    return () => {
      isMounted = false;
    };
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
  const updateProfile = async (newProfile) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(newProfile)
      .eq("id", user.id)
      .select();

    await getUser();
    
    return { data, error };
  };

  return (
    <UserContext.Provider
      value={{ user, profile, signOut, signUp, login, getUser, updateProfile }}
    >
      {children}
    </UserContext.Provider>
  );
}
