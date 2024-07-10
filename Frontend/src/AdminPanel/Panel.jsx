import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Panel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error, "Error in fetching tha database.");
      });
  }, []);

  const handleDelete = (id, index) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then(() => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error, "Error in fetching the database.");
      });
  };

  return (
    <section class="text-gray-600 body-font">
      <Link to={"/add"}>
        <button
          type="submit"
          className=" text-white m-4 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Add User
        </button>
      </Link>
      <div class="container px-5 py-24 mx-auto flex flex-col ">
        {users &&
          users.map((user, index) => (
            <div class="flex justify-between m-1  ">
              <div class="p-4  md:w-full ">
                <div class="flex border-2 rounded-lg border-gray-200 justify-between border-opacity-50 p-8 sm:flex-row flex-col">
                  <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 ">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                      {`${user.firstName} ${user.lastName}`}
                    </h2>
                    <p>{`${user.email}`}</p>
                  </div>
                  <div className="m-2 flex">
                    <button
                      type="submit"
                      className="w-full text-white m-4 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <Link to={`/edit/${user._id}`}>Edit</Link>
                    </button>
                    <button
                      type="submit"
                      className="w-full text-white m-4 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={() => handleDelete(user._id, index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Panel;
