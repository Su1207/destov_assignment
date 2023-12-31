import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserList from "../components/UserList";
import { db } from "../Firebase";
import Navbar from "../components/Navbar";

const Home = ({ user, handleLogout }) => {
  const userId = user?.uid;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [orderOption, setOrderOption] = useState("none");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setLoading(false);
        setUsers(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unSub();
    };
  }, []);

  //   useEffect(() => {
  //     console.log(users);
  //   }, [users]);

  useEffect(() => {
    let newFilteredUsers = users;

    if (selectedDate) {
      const selectedTimestamp = selectedDate.getTime() / 1000;
      newFilteredUsers = newFilteredUsers.filter((item) => {
        const userTimestamp = item.timestamp.toDate().toDateString();
        return userTimestamp === selectedDate.toDateString();
      });
    }

    if (orderOption !== "none") {
      newFilteredUsers = newFilteredUsers.filter(
        (item) => item.gender === orderOption
      );
    }

    setFilteredUsers(newFilteredUsers);
  }, [selectedDate, orderOption, users]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete")) {
      try {
        setLoading(true);
        deleteDoc(doc(db, "users", id));
        toast.success("Profile deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="p-6">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-semibold text-gray-700">
          Select Date
        </label>
        <input
          className="px-2 rounded-md text-sm font-semibold focus:outline-none"
          type="date"
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setSelectedDate(e.target.value ? new Date(e.target.value) : null)
          }
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-semibold text-gray-700">
          Select Gender
        </label>
        <select
          className="rounded-md px-2 py-1 text-sm font-semibold focus:outline-none"
          value={orderOption}
          onChange={(e) => setOrderOption(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="none">None</option>
        </select>
      </div>

      <UserList users={filteredUsers} user={user} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
