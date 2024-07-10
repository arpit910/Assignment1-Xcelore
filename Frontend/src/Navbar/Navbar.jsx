import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const user = useSelector((state) => state);
  return (
    <header class="text-gray-900 bg-gray-200  text-lg">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={"/"} className="text-2xl">
          Home
        </Link>
        <img src="https://xcelore.com/wp-content/uploads/2023/08/cropped-log-w.png" className="md:ml-auto flex flex-wrap items-center gap-4 justify-center" alt="..." width={"300px"} height={"100px"}/>
        <nav class="md:ml-auto flex flex-wrap items-center gap-4 justify-center">
        {localStorage.getItem("token") ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          {localStorage.getItem("role") === "admin" && (
            <div>
              <Link to={"/admin"}>Admin</Link>
            </div>
          )}
        </>
      ) : (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </>
      )}

        </nav>
      </div>
    </header>
  );
}

export default Navbar;
