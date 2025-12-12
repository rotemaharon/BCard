import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { type UserType } from "../interfaces/UserType";

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  isBusiness: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const initialContext: AuthContextType = {
  user: null,
  token: null,
  isBusiness: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(initialContext);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserType | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? (jwtDecode(storedToken) as unknown as UserType) : null;
  });

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(jwtDecode(newToken) as unknown as UserType);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isBusiness: user?.isBusiness || false,
      isAdmin: user?.isAdmin || false,
      login,
      logout,
      isLoading: false,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
