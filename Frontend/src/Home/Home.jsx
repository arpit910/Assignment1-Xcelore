import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const uid = localStorage.getItem("userId");
  const user = useSelector((state) => state);
  return (
    <div>
      {user.isLoggedIn && (
        <h1 className="my-4 flex justify-center">Welcome {user.firstName}</h1>
      )}
    </div>
  );
}

export default Home;
