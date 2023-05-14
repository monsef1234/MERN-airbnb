import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const AppCtx = createContext();

const AppProvider = ({ children }) => {
  const [member, setMember] = useState(null);
  const [ready, setReady] = useState(false);
  const [mainPhoto, setMainPhoto] = useState(0);
  const [cookie, _] = useCookies();
  useEffect(() => {
    const fetchUser = async () => {
      if (!member) {
        if (cookie.token) {
          await axios
            .get(`/auth/profile/${cookie.token}`)
            .then((res) => setMember(res.data));
          setReady(true);
        } else {
          setReady(true);
        }
      }
    };
    fetchUser();
  }, []);
  return (
    <AppCtx.Provider
      value={{ member, setMember, ready, mainPhoto, setMainPhoto }}
    >
      {children}
    </AppCtx.Provider>
  );
};
export const useGlobalCtx = () => {
  return useContext(AppCtx);
};
export { AppProvider };
