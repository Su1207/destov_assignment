import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleGender = (e) => {
    setState({ ...state, gender: e.target.value });
  };

  const getUserDetails = async () => {
    const docRef = doc(db, "users", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setState({ ...snapshot.data() });
    }
    // console.log(state);
  };

  useEffect(() => {
    id && getUserDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName && userEmail && number && designation && gender) {
      if (!id) {
        try {
          await addDoc(collection(db, "users"), {
            ...state,
            timestamp: serverTimestamp(),
            admin: user.displayName,
            userId: user.uid,
          });
          navigate("/");
          toast.success("User profile created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "users", id), {
            ...state,
            timestamp: serverTimestamp(),
            admin: user.displayName,
            userId: user.uid,
          });
          navigate("/");
          toast.success("Profile updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toast.error("All fields are mandatory to fill");
    }
  };

  return (
    <div>
      <div className="font-sans md:flex md:items-center h-screen sm:overflow-hidden">
        <div className="sm:flex-1">
          <img src={User} alt="User" className="" />
        </div>
        <div className="sm:flex-1 bg-white min-h-full sm:h-screen">
          <div className="flex flex-col gap-5 h-full px-4 py-8 border-l">
            <h1 className="text-3xl font-bold">
              {id ? "Update User Profile" : "Create User Profile"}
            </h1>
            <form onSubmit={handleSubmit} className="rounded-sm">
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
                <label className="text-sm font-medium text-gray-500">
                  Gender
                </label>
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
                className="bg-gray-800 py-1 px-5 mt-2 text-white rounded-md hover:bg-black"
              >
                {id ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
