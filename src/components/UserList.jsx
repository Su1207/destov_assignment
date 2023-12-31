import React from "react";
import profile from "../assets/author.jpg";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BiEdit, BiTrash } from "react-icons/bi";
import { GiFlowerStar } from "react-icons/gi";
import Gender from "./Gender";
import { useNavigate } from "react-router-dom";

const UserList = ({ user, users, handleDelete }) => {
  // Sort users based on timestamp string
  const sortedUsers = users?.sort((a, b) => {
    const timestampA = a.timestamp.seconds;
    const timestampB = b.timestamp.seconds;

    return timestampB - timestampA;
  });

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-5 mx-auto mt-5 font-sans">
      {sortedUsers?.map((item) => (
        <div key={item.id}>
          <div
            className="h-60 px-4 py-2 bg-orange-400 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-110 flex-1 flex flex-col"
            // style={{ backgroundColor: "#FFA351" }}
          >
            <div className="flex justify-start gap-4 items-center flex-1">
              <img
                src={profile}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover object-center"
              />
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold">{item.userName}</h2>
                <p className="text-xs text-gray-800 font-bold">
                  {item.designation}
                </p>
              </div>
            </div>
            <div className="mt-5 text-sm flex-1">
              <div className="flex items-center gap-2 mb-1">
                {item.userEmail ? <MdEmail /> : <></>}
                <p>{item.userEmail}</p>
              </div>

              <div className="flex items-center gap-2">
                {item.number ? <BsFillTelephoneFill /> : <></>}
                <p>{item.number}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.gender ? <Gender gender={item.gender} /> : <></>}
                <p>{item.gender}</p>
              </div>
            </div>
            <div className="flex justify-between mt-5 flex-1 items-end">
              {user && user.uid === item.userId && (
                <div className="flex items-center gap-1">
                  <BiEdit
                    onClick={() => navigate(`/update/${item.id}`)}
                    className="cursor-pointer"
                  />
                  <BiTrash
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer"
                  />
                </div>
              )}

              <div className="text-xs font-semibold flex items-center gap-1">
                Created by <GiFlowerStar className="text-xs" />{" "}
                <span>{item.admin}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
