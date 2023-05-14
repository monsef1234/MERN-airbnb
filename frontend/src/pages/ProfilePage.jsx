import React from "react";
import { useGlobalCtx } from "../context/context";
import { useCookies } from "react-cookie";
import Links from "../components/Links";
const ProfilePage = () => {
  const { member, ready } = useGlobalCtx();
  const [cookie, _, removeCookie] = useCookies();
  const logoutHandler = () => {
    removeCookie("token");
  };
  if (!ready) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  return (
    <div>
      <Links />
      <div className="max-w-lg mx-auto text-center mt-3">
        <p>
          Logged in as {member.name}{" "}
          <span className="font-bold">({member.email})</span>
        </p>
        <button
          onClick={logoutHandler}
          className="bg-primary w-full rounded-full py-2 text-white font-bold cursor-pointer active:scale-95 mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
