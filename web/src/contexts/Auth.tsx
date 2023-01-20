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
  // token: string;
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
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    setData({} as AuthState);

    localStorage.clear();
  }, []);

  const signIn = useCallback(async ({ username, password }: User) => {
    try {
      const { user, token } = await signInService({ username, password });

      // const {
      //   username: usernameResponse,
      //   password: passwordResponse,
      //   isAdmin,
      // } = response;

      localStorage.setItem("@sharenergy:token", JSON.stringify(token));
      localStorage.setItem("@sharenergy:user", JSON.stringify(user));

      setData({
        user,
        token,
      });
    } catch (err) {
      signOut();

      alert("User doesnt exists");
    }
  }, []);

  useEffect(() => {
    try {
      const localToken = localStorage.getItem("@sharenergy:token");
      const localUser = localStorage.getItem("@sharenergy:user");

      if (localToken && localUser) {
        const parsedUser = JSON.parse(localUser);
        // const parsedToken = JSON.parse(localUser);

        setData({ user: parsedUser, token: localToken });
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
