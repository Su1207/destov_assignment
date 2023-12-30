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

  useEffect(() => {
    console.log(users);
  }, [users]);

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

      <UserList users={users} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
