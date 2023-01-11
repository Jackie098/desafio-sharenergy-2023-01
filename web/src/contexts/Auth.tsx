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
  user: { username: string; password: string };
  isAdmin: boolean;
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
      const response = await signInService({ username, password });

      const {
        username: usernameResponse,
        password: passwordResponse,
        isAdmin,
      } = response;

      localStorage.setItem("@sharenergy:user", JSON.stringify(response));

      setData({
        user: { username: usernameResponse, password: passwordResponse },
        isAdmin,
      });
    } catch (err) {
      signOut();

      alert("User doesnt exists");
    }
  }, []);

  const authContextData = useMemo(() => {
    return {
      loading,
      user: data.user,
      signIn,
      signOut,
    };
  }, [data, signIn, signOut]);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}
