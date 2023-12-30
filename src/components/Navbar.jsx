import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  const userId = user?.uid;
  return (
    <div className="flex justify-between items-start">
      {userId ? (
        <div>
          <h3 className="text-xl font-semibold">Welcome</h3>
          <h1 className="text-center mb-2 text-3xl font-bold">
            {user?.displayName}
          </h1>
        </div>
      ) : (
        <h1 className="text-center mb-2">Null</h1>
      )}
      <div className="flex gap-3 items-center justify-center">
        <Link
          to="/create"
          className="border px-3 py-2 rounded-md bg-black text-white"
        >
          Create User
        </Link>
        {userId ? (
          <Link
            className="border px-3 py-2 rounded-md bg-black text-white"
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          <Link
            className="border px-3 py-2 rounded-md bg-black text-white"
            to="/"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
