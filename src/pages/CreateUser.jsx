import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import User from "../assets/user.jpg";

const initialState = {
  userName: "",
  userEmail: "",
  number: "",
  gender: "",
  designation: "",
};

const genderCategory = ["Male", "Female", "Transgender", "Other"];

const CreateUser = ({ user }) => {
  const [state, setState] = useState(initialState);
  const { userName, userEmail, number, designation, gender } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleGender = (e) => {
    setState({ ...state, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName && userEmail && number && designation) {
      try {
        await addDoc(collection(db, "users"), {
          ...state,
          timestamp: serverTimestamp(),
          admin: user.displayName,
          userId: user.uid,
        });
        navigate("/home");
        toast.success("User profile created successfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("All fields are mandatory to fill");
    }
  };

  return (
    <div className="font-sans flex items-center justify-center h-screen ">
      <div className="flex-1">
        <img src={User} alt="User" className="object-cover" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="pt-12 px-4 border shadow-lg bg-white rounded-sm flex-1 h-full items-center"
      >
        <div>
          <label className="text-sm font-medium mb-2 text-gray-500">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            value={userName}
            className="p-2 mb-2 border rounded-md w-full text-sm focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 text-gray-500">
            Email
          </label>
          <input
            type="email"
            name="userEmail"
            value={userEmail}
            className="p-2 mb-2 border rounded-md w-full text-sm focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 text-gray-500">
            Phone
          </label>
          <input
            type="text"
            name="number"
            value={number}
            className="p-2 mb-2 border rounded-md w-full text-sm focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 text-gray-500">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={designation}
            className="p-2 mb-2 border rounded-md w-full text-sm focus:outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500">Gender</label>
          <select
            value={gender}
            onChange={handleGender}
            className="border rounded-md p-2 mb-2 focus:outline-none"
          >
            <option></option>
            {genderCategory.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-black py-1 px-3 mt-2 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
