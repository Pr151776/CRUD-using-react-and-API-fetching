import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addusers = ( {users} ) => {
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")

    const addUser = {
      id : users.length+1,
      name : user,
      age : age,
      city : city
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:4000/users", addUser)
            .then( (res) => {
              console.log(res);
              navigate("/");
            })
            .catch( (err) => console.log(err) );
    }

  return (
    <div className="min-h-screen bg-black text-white py-15">
      <div className="mb-10 flex justify-center">
        <h1 className="text-4xl">Add user</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white w-[500px] rounded px-8 pt-6 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user}
              onChange={ (e) => setUser(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="age"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={ (e) => setAge(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mb-3"
            />
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={ (e) => setCity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center mb-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addusers;
