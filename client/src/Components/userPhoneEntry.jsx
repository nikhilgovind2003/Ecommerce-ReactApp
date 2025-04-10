import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPhoneEntry = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation regex (simple check for valid phone numbers)
    const phoneRegex = /^[0-9]{10}$/; // Adjust the regex as per your requirements (e.g., 10-digit numbers)
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return; // Stop submission if the phone number is invalid
    }

    setError(""); // Clear any previous error

    // Send the phone number to your API
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/send-otp",
        { phoneNumber } // Send phoneNumber in an object
      );

      if (res.data.success) {
        alert("Otp Send to your phone Number")
        localStorage.setItem("phone", phoneNumber)
        navigate("/otp");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-[70vh]">
      <div className="flex flex-col shadow-md border-2 p-6 w-[400px] bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Enter your phone number
        </h2>

        {/* Phone Field */}
        <div className="flex flex-col mb-4">
          <input
            type="tel" // Changed to "tel" for better semantic meaning
            id="phone"
            name="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Fixed the onChange handler
            placeholder="Enter your phone..."
            className="border-2 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-800 outline-none"
            maxLength={10}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit} // Corrected function name
          className="w-full bg-blue-800 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserPhoneEntry;
