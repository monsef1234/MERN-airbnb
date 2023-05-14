import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet";

const Register = () => {
  const [typeInput, setTypeInput] = useState("password");
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { ...user }).then((res) => {
        // navigate("/login");
        setUser({ name: "", email: "", password: "" });
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Helmet title="register">
      <div className="register flex flex-col grow justify-center">
        <div>
          <h1 className="text-center text-4xl mb-6">Register</h1>
          <form
            autoComplete="off"
            onSubmit={submitHandler}
            className="flex max-w-md mx-auto flex-col gap-2"
            action=""
          >
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={user.name}
              onChange={changeHandler}
            />
            <input
              type="text"
              name="email"
              placeholder="your@email.com"
              value={user.email}
              onChange={changeHandler}
            />
            <div className="relative">
              <input
                type={typeInput}
                name="password"
                placeholder="password"
                className="w-full"
                value={user.password}
                onChange={changeHandler}
              />
              <div></div>
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
              Register
            </button>
            <small className="text-center tracking-tight">
              Already Member?{" "}
              <Link to={"/login"} className="underline text-blue-500">
                Login!
              </Link>
            </small>
          </form>
        </div>
      </div>
    </Helmet>
  );
};

export default Register;
