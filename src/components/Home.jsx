import React, { useEffect } from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ users, setUsers }) => {

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        setUsers(res.data);
        // localStorage.setItem("Users",JSON.stringify(res.data));
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEDit = (id) => {
    if (!id) return;
    if (id) {
      navigate(`/edituser/${id}`);
    };
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/users/${id}`)
    .then( (res) => {
      console.log("Deleted successfull", {"Deleted user" : res});
      navigate("/");
    })
    .catch( (err) => console.log(err) );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex justify-center items-center pt-20">
        <h1 className="text-4xl py-5">CRUD using React & API</h1>
      </div>
      <div className="me-10 mb-10">
        <NavLink
          to="/adduser"
          className="border border-blue-600 px-8 py-2 rounded-2xl float-end cursor-pointer hover:bg-blue-600"
        >
          {" "}
          Add user{" "}
        </NavLink>
      </div>
      <div>
        {users ? (
          <table className="table-fixed w-2xl mx-auto">
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Action</th>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-10">{user.id}</td>
                  <td className="px-10">{user.name}</td>
                  <td className="px-10">{user.age}</td>
                  <td className="px-10">{user.city}</td>
                  <td className="flex gap-6">
                    <button className="py-2 px-5 bg-green-700 mb-5 rounded cursor-pointer hover:bg-green-600" onClick={ () => handleEDit(user.id)}>
                      Edit
                    </button>
                    <button className="py-2 px-5 bg-red-700 mb-5 rounded cursor-pointer hover:bg-red-600" onClick={ () => handleDelete(user.id) }>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p> Loading... </p>
        )}
      </div>
    </div>
  );
};

export default Home;
