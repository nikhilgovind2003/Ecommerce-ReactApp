import { useRef, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPPage = () => {
  const container = [1, 2, 3, 4, 5, 6];
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      // Accept only digits or empty values
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value.length === 1 && index < container.length - 1) {
        // Move to the next input
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      // Move to the previous input if backspacing on an empty field
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        {
          otp: otpValue,
          phone: localStorage.getItem("phone")
        }
      );




      if (res.data.success) {
        alert(res.data.message);
        navigate("/reset-password");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-[70vh] p-4">
        <div className="p-6 bg-white w-[450px]">
          <div className="text-center">
            <h1 className="font-bold text-3xl mb-2">Verify OTP</h1>
            <p className="text-gray-500">
              Enter the 6-digit OTP we just sent to your phone
            </p>
          </div>

          <div className="mt-4">
            <h1 className="ml-4 mb-4">OTP</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
            >
              <div className="flex items-center justify-center gap-4">
                {container.map((_, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="number"
                        required
                        maxLength={1}
                        className="outline-none border-2 w-12 h-12 font-bold text-center hover:border-blue-500 appearance-none"
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={otp[index]}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white text-center md:text-lg rounded-md py-4"
                >
                  Verify
                </button>
                <div className=" text-lg text-blue-400 mt-4 font-semibold">
                  <Countdown date={Date.now() + 1 * 60 * 1000} />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="w-full border-2 border-blue-500 mt-4 font-semibold md:text-lg bg-white text-blue-500 rounded-md py-4 hover:text-white hover:bg-blue-500"
                >
                  Back to verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPPage;
