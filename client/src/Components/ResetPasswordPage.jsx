import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ResetPasswordPage = () => {
  const [formData, setformData] = useState({
    password: "",
    confirmPassword: "",
    phone: localStorage.getItem("phone"),
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSumit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          data: formData,
          phone: localStorage.getItem("phone"),
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[70vh] p-4">
      <div className="flex flex-col shadow-md border-2 p-6 w-[400px] bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Reset Password
        </h2>

        {/* Password Field */}
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password..."
            className="border-2 px-3 py-2 rounded-md focus:border-blue-500 outline-none"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col mb-6">
          <label htmlFor="confirmPassword" className="text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm your password..."
            className="border-2 px-3 py-2 rounded-md  focus:border-blue-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSumit}
          className="w-full bg-blue-500 text-white py-2 rounded-md text-lg hover:bg-blue-600 transition duration-300"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
