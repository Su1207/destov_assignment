import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Login from "../assets/login-side-img.png";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

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
          navigate("/");
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
          navigate("/");
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
    <div className="flex items-center w-full sm:justify-center min-h-screen bg-slate-100">
      <div className="w-full min-h-screen sm:min-h-full  rounded-sm shadow-lg bg-white xl:flex lg:flex md:flex sm:flex sm:gap-8 sm:pr-5 justify-center items-center gap-4">
        <div className="flex-1 mb-10 sm:mb-0">
          <img src={Login} alt="" className="sm:h-full h-25 w-full" />
        </div>
        <div className="flex-1">
          <div className="sm:flex  flex flex-col justify-center items-center mx-2">
            {signUp ? (
              <h1 className="text-3xl mb-8 font-bold">Sign Up</h1>
            ) : (
              <h1 className="text-3xl mb-8 font-bold">Log In</h1>
            )}
            <form
              className="flex flex-col items-center gap-1 min-w-full px-5 sm:px-0"
              onSubmit={handleAuth}
            >
              {signUp && (
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center relative">
                    <FaUserAlt className="absolute text-gray-600" />
                    <input
                      type="text"
                      className="p-2 pl-8 border-b rounded-sm w-full text-sm focus:outline-none"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center relative">
                    <FaUserAlt className="absolute text-gray-600" />
                    <input
                      type="text"
                      className="p-2 pl-8 border-b rounded-sm w-full focus:outline-none text-sm"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center relative w-full">
                <MdEmail className="absolute text-gray-600 text-lg" />
                <input
                  type="email"
                  className="p-2 pl-8 border-b rounded-sm w-full text-sm focus:outline-none"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center relative w-full">
                <RiLockPasswordFill className="absolute text-gray-600 text-lg" />
                <input
                  type="password"
                  className="p-2 pl-8 mb-1 border-b rounded-sm text-sm w-full focus:outline-none"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              {signUp && (
                <div className="flex items-center relative w-full">
                  <RiLockPasswordFill className="absolute text-gray-600 text-lg" />
                  <input
                    type="password"
                    className="p-2 pl-8 border-b rounded-sm w-full text-sm focus:outline-none"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="text-xs">
                Password must contain at least 6 characters
              </div>
              <button
                type="submit"
                className={
                  signUp
                    ? `border rounded-md py-1 px-4 my-2 bg-blue-400 font-medium`
                    : `border rounded-md py-1 px-4 my-2 bg-red-500 font-medium`
                }
              >
                {!signUp ? "Log In" : "Sign Up"}
              </button>
            </form>
            <div>
              {!signUp ? (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500">
                    Don't have an account ?&nbsp;
                    <span
                      className="text-blue-400 cursor-pointer"
                      onClick={() => setSignUp(true)}
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500">
                    Already have an account ?&nbsp;
                    <span
                      className="cursor-pointer decoration-none text-red-500"
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
      </div>
    </div>
  );
};

export default Auth;
