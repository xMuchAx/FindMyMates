import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchText, setSearchText] = useState(null); // Ajout de la propriété searchText


  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  const isLoggedIn = () => {
    return !!token; // La fonction renvoie true si le token existe, sinon false
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isLoggedIn, setSearchText, searchText }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
