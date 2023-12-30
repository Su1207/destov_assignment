import React from "react";

const Home = ({ user }) => {
  const userId = user?.uid;
  return (
    <div>
      {userId ? (
        <h1 className="text-center">{user?.displayName}</h1>
      ) : (
        <h1>Null</h1>
      )}
    </div>
  );
};

export default Home;
