import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet";
import { useCookies } from "react-cookie";
import { useGlobalCtx } from "../context/context";
const Login = () => {
  const { setMember } = useGlobalCtx();
  const [typeInput, setTypeInput] = useState("password");
  const [user, setUser] = useState({ email: "", password: "" });
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", { ...user }).then((res) => {
        setMember(res.data.user);
        setCookie("token", res.data.token);
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Helmet title={"login"}>
      <div className="login flex flex-col grow justify-center">
        <div>
          <h1 className="text-center text-4xl mb-6">Login</h1>
          <form
            autoComplete="off"
            onSubmit={submitHandler}
            action=""
            className="max-w-md mx-auto flex flex-col gap-2"
          >
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
              value={user.email}
              onChange={changeHandler}
            />
            <div className="relative">
              <input
                type={typeInput}
                placeholder="password"
                name="password"
                className="w-full"
                value={user.password}
                onChange={changeHandler}
              />
              {typeInput === "password" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="iconPassword"
                  onClick={() => setTypeInput("text")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="iconPassword"
                  onClick={() => setTypeInput("password")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
            <button type="submit" className="primary">
              Login
            </button>
            <small className="text-center tracking-tight">
              Don't have an account yet?{" "}
              <Link className="underline text-blue-500" to={"/register"}>
                Register now!
              </Link>
            </small>
          </form>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
