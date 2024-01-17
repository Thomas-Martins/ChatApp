import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{
      userData,
      token,
      setUserData,
      setToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => {
  return useContext(AuthContext);
};