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
      setAuthUser({
        authEmail: window.localStorage.getItem("user_email"),
        authUserName: window.localStorage.getItem("user_name"),
        authUserCredits: window.localStorage.getItem("user_credits"),
        authUserToken: window.localStorage.getItem("access_token"),
      });
    }
  }, []);

  const login = (userData) => {
    window.localStorage.setItem("access_token", userData.accessToken);
    window.localStorage.setItem("user_email", userData.email);
    window.localStorage.setItem("user_name", userData.name);
    window.localStorage.setItem("user_credits", userData.credits);
    setAuthUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    window.localStorage.removeItem("user_name");
    window.localStorage.removeItem("user_email");
    window.localStorage.removeItem("user_credits");
    window.localStorage.removeItem("access_token");
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
