import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (!signUp) {
        if (email && password) {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          navigate("/home");
        } else {
          toast.error("All fields are mandatory to fill");
        }
      } else {
        if (password !== confirmPassword) {
          toast.error("Password don't match");
        } else if (firstName && lastName && email && password) {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
          });
          navigate("/home");
        } else {
          toast.error("All fields are mandatory to fill");
        }
      }
    } catch (error) {
      // Handle login error
      console.error("Login Error: ", error);
      toast.error("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center w-full justify-center h-screen">
      <div className="border border-black w-80 p-5 flex flex-col items-center justify-center rounded-sm shadow-md bg-white">
        <div>
          {signUp ? (
            <h1 className="text-3xl mb-4 font-semibold text-gray-500">
              Sign Up
            </h1>
          ) : (
            <h1 className="text-3xl mb-4 font-semibold text-gray-500">
              Log In
            </h1>
          )}
        </div>
        <form
          className="flex flex-col items-center gap-2 min-w-full"
          onSubmit={handleAuth}
        >
          {signUp && (
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="p-2 border rounded-sm w-full text-sm focus:outline-none"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                className="p-2 border rounded-sm w-full focus:outline-none text-sm"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
          )}

          <input
            type="email"
            className="p-2 border rounded-sm w-full text-sm focus:outline-none"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="p-2 mb-1 border rounded-sm text-sm w-full focus:outline-none"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />

          {signUp && (
            <input
              type="password"
              className="p-2 mb-1 border rounded-sm w-full text-sm focus:outline-none"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          )}

          <button
            type="submit"
            className="border rounded-md py-1 px-4 my-2 bg-blue-500 font-medium"
          >
            {!signUp ? "Log In" : "Sign Up"}
          </button>
        </form>
        <div>
          {!signUp ? (
            <div className="">
              <p className="text-xs">
                Don't have an account ?&nbsp;
                <span
                  className="link-danger"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#298af2",
                  }}
                  onClick={() => setSignUp(true)}
                >
                  Sign Up
                </span>
              </p>
            </div>
          ) : (
            <div className="para-btn">
              <p className="text-xs">
                Already have an account ?&nbsp;
                <span
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#c43421",
                  }}
                  onClick={() => setSignUp(false)}
                >
                  Sign In
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
