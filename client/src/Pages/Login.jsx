import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [isLoggedIn, setisLoggedIn] = useState(false);

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
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (response.data.success) {
        alert(response.data.message);
        navigate("/home");
        setisLoggedIn(true);
        localStorage.setItem("token", response.data.token);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" rounded-md shadow-lg text-center w-[500px] mt-24 mx-auto p-4">
        <h1 className=" text-lg md:text-3xl font-bold mb-6">Login</h1>
        <form action="POST" onSubmit={onHandleSubmit}>
          <div className="text-left mb-5">
            <label htmlFor="name">Phone</label>
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

        <div className=" mt-6 px-4 flex items-center justify-between w-full">
          <div className="">
            <Link to="/register" className=" font-semibold underline text-blue-500">
              Create Account
            </Link>
          </div>
          <div className=" text-gray-500 font-bold">
            <Link to="/forgot-password" className=" text-blue-500 underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
