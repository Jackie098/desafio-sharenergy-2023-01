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
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isRemember, setIsRemember] = useState(false);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    setData({} as AuthState);

    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const signIn = useCallback(
    async ({ username, password, isRemember }: User) => {
      try {
        setIsRemember(isRemember!);

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

        alert("User doesnt exists");
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
      } else if (sessionToken && sessionUser) {
        const parsedUser = JSON.parse(sessionUser);

        setData({ user: parsedUser, token: sessionToken });
      }
    } catch (error) {
      signOut();
    } finally {
      setLoading(false);
    }
  }, []);

  const authContextData = useMemo(() => {
    return {
      loading,
      user: data.user,
      signIn,
      signOut,
    };
  }, [data, signIn, signOut, loading]);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}
