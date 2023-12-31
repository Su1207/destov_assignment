import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiHandsPraying } from "react-icons/pi";

const Navbar = ({ user, handleLogout }) => {
  const userId = user?.uid;
  const [orderOption, setOrderOption] = useState("none");
  return (
    <div className="flex justify-between items-start">
      {userId ? (
        <div>
          <h3 className="sm:text-xl text-lg font-semibold flex items-center gap-2">
            Welcome{" "}
            <span className="sm:text-2xl text-xl">
              <PiHandsPraying />
            </span>
          </h3>
          <h1 className="text-center mb-2 text-xl sm:text-3xl font-bold">
            {user?.displayName}
          </h1>
        </div>
      ) : (
        <h1 className="text-center mb-2"></h1>
      )}
      <div className="flex sm:gap-3 gap-1 items-center justify-center">
        <Link
          to="/create"
          className=" px-3 py-2 rounded-md font-bold text-md hover:bg-black hover:text-white transition-all ease-in-out duration-300"
        >
          Create
        </Link>
        {userId ? (
          <Link
            className=" px-3 py-2 rounded-md font-bold text-md hover:bg-black hover:text-white transition-all ease-in-out duration-300"
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          <Link
            className=" px-3 py-2 rounded-md font-bold text-md hover:bg-black hover:text-white transition-all ease-in-out duration-300"
            to="/auth"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
