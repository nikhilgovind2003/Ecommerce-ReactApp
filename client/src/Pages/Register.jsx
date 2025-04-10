import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleCahnge = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:3000/api/auth/register", formData);

      if (data.success) {
        navigate("/")
        alert(`${data.message}`)
      }
      else {
        alert(`${data.message}`)
      }
      

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" rounded-md shadow-lg text-center w-[500px] mx-auto p-4">
        <h1 className=" text-lg md:text-3xl font-bold mb-6">Register</h1>
        <form action="POST" onSubmit={onHandleSubmit}>
          <div className="text-left mb-5">
            <label htmlFor="name" className="">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleCahnge}
              placeholder="Enter your name"
              required
              className=" w-full p-2 focus:border-green-500 rounded-md focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 mt-2  border-gray-500 outline-gray-500 border-2"
            />
          </div>

          <div className="text-left mb-5">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleCahnge}
              placeholder="Enter your Email"
              required
              className=" w-full p-2 focus:border-green-500 rounded-md focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 mt-2  border-gray-500 outline-gray-500 border-2"
            />
          </div>
          <div className="text-left mb-5">
            <label htmlFor="name">Phone No:</label>
            <input
              type="number"
              name="phone"
              onChange={handleCahnge}
              placeholder="Enter your Phone Number"
              required
              className=" w-full p-2 focus:border-green-500 rounded-md focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 mt-2  border-gray-500 outline-gray-500 border-2"
            />
          </div>

          <div className="text-left mb-5">
            <label htmlFor="name">Password</label>
            <input
              type="Password"
              name="password"
              onChange={handleCahnge}
              placeholder="Enter Password"
              required
              className=" w-full p-2 focus:border-green-500 rounded-md focus:outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 mt-2  border-gray-500 outline-gray-500 border-2"
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className=" bg-blue-500 text-center text-white font-semibold w-full py-2 rounded-md hover:bg-blue-600 transition duration-100"
          />
        </form>

        <div className=" mt-6 px-4">
          <span className=" text-gray-500 font-bold">Have an Acount? <Link to='/' className=" text-red-600 underline">Login</Link></span>
        </div>
      </div>
    </>
  );
};

export default Register;
