// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {

    const param = useParams();
    const navigate = useNavigate();
    const [editUser, seteditUser] = useState("")
    const [editAge, seteditAge] = useState("")
    const [editCity, seteditCity] = useState("")

    useEffect( () => {
        if (param) {
            axios.get(`http://localhost:4000/users/${param.id}`)
            .then( (res) => {
                // console.log(res.data);
                seteditUser(res.data.name)
                seteditAge(res.data.age)
                seteditCity(res.data.city)
            } )
            .catch( (err) => console.log(err) );
        }
    }, []);

    const updateUser = {
      name : editUser,
      age : editAge,
      city : editCity
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!editUser || !editAge || !editCity) {
          alert("Please fill all fields");
          return;
        };

        axios.patch(`http://localhost:4000/users/${param.id}`, updateUser)
        .then( (res) => {
            console.log( "Update successfull", res);
            navigate("/");
        })
        .catch( (err) => console.log(err.message) );
    };

  return (
    <div className="min-h-screen bg-black text-white py-15">
      <div className="mb-10 flex justify-center">
        <h1 className="text-4xl">Edit user</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <form onSubmit={ handleSubmit }  className="bg-white w-[500px] rounded px-8 pt-6 mb-4">
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
              value={editUser}
              onChange={ (e) => seteditUser(e.target.value)}
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
              value={editAge}
              onChange={ (e) => seteditAge(e.target.value)}
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
              value={editCity}
              onChange={ (e) => seteditCity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center mb-8">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
