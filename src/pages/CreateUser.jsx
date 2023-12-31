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
    <div className="h-screen">
      <div className="font-sans sm:flex md:overflow-hidden h-full">
        <div className="sm:flex-1">
          <img
            src={User}
            alt="User"
            className="sm:h-screen w-full object-cover object-center h-2/4"
          />
        </div>
        <div className="sm:flex-1 bg-white sm:h-screen h-3/5">
          <div className="flex flex-col gap-2 h-full px-4 justify-center">
            <h1 className="text-xl md:text-3xl font-bold flex justify-center mb-4">
              {id ? "Update User Profile" : "Create User Profile"}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="rounded-sm flex flex-col sm:block"
            >
              <div>
                <label className="text-xs md:text-sm font-medium mb-2 text-gray-500">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  className="p-1 mb-1 md:p-2 md:mb-2 border rounded-md w-full text-sm focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium mb-2 text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={userEmail}
                  className="p-1 mb-1 md:p-2 md:mb-2 border rounded-md w-full text-sm focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium mb-2 text-gray-500">
                  Phone
                </label>
                <input
                  type="text"
                  name="number"
                  value={number}
                  className="p-1 mb-1 md:p-2 md:mb-2 border rounded-md w-full text-sm focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium mb-2 text-gray-500">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={designation}
                  className="p-1 mb-1 md:p-2 md:mb-2 border rounded-md w-full text-sm focus:outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-xs md:text-sm font-medium text-gray-500">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={handleGender}
                  className="border rounded-md p-1 mb-1 md:p-2 md:mb-2 focus:outline-none w-full"
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
                className="bg-gray-800 py-1 px-5 mt-2 text-white rounded-md hover:bg-black sm:pb-0"
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
