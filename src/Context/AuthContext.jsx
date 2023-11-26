import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  authUser: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setAuthUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ authUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
