import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { data } from "autoprefixer";
import { AuthService } from "./services/AuthService";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      AuthService.loginWithToken().then((data) => {
        setUser(data);
        setReady(true);
      });
    } else setReady(true);
  }, [user, setUser, setReady]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
