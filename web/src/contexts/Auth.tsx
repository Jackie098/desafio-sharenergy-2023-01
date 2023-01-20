import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { signInService } from "../services/sessions";
import { User } from "../types/user";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthState = {
  user: {
    id: string;
    username: string;
    password: string;
    isAdmin: boolean;
    email: string;
  };
  token: string;
};

export type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => string | null | undefined;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [local, setLocal] = useState<"local" | "session">("session");
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    setData({} as AuthState);

    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const signIn = useCallback(
    async ({ username, password, isRemember }: User) => {
      try {
        console.log("signIn - isRemember", isRemember);
        const { user, token } = await signInService({ username, password });

        if (isRemember) {
          localStorage.setItem("@sharenergy:token", JSON.stringify(token));
          localStorage.setItem(
            "@sharenergy:user",
            JSON.stringify({ ...user, isRemember })
          );
        } else {
          sessionStorage.setItem("@sharenergy:token", JSON.stringify(token));
          sessionStorage.setItem(
            "@sharenergy:user",
            JSON.stringify({ ...user, isRemember })
          );
        }

        setData({
          user,
          token,
        });
      } catch (err) {
        signOut();

        alert("User doesn't exists");
      }
    },
    []
  );

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("@sharenergy:token");
      const localUser = localStorage.getItem("@sharenergy:user");

      const sessionToken = sessionStorage.getItem("@sharenergy:token");
      const sessionUser = sessionStorage.getItem("@sharenergy:user");

      if (localToken && localUser) {
        const parsedUser = JSON.parse(localUser);

        setData({ user: parsedUser, token: localToken });
        setLocal("local");
      } else if (sessionToken && sessionUser) {
        const parsedUser = JSON.parse(sessionUser);

        setData({ user: parsedUser, token: sessionToken });
        setLocal("session");
      }
    } catch (error) {
      signOut();
    } finally {
      setLoading(false);
    }
  }, []);

  const getToken = () => {
    let token;

    if (local === "local") {
      token = JSON.parse(localStorage.getItem("@sharenergy:token")!);
    } else if (local === "session") {
      token = JSON.parse(sessionStorage.getItem("@sharenergy:user")!);
    }

    return token;
  };

  const authContextData = useMemo(() => {
    return {
      loading,
      user: data.user,
      signIn,
      signOut,
      getToken,
    };
  }, [data, signIn, signOut, loading, getToken]);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}
