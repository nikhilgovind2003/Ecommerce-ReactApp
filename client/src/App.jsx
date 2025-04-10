import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import HomeLayout from "./Layout/HomeLayout";
import Home from "./Pages/Home";
import ProductDetails from "./Components/ProductDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Components/Cart";
import ProductForm from "./Pages/ProductForm";
import Sidebar from "./Components/Sidebar";
// import { useContext } from "react";
// import  userContext from "./context/userContext";
import OTPPage from "./Components/OtpPage";
import ResetPasswordPage from "./Components/ResetPasswordPage";
import UserPhoneEntry from './Components/userPhoneEntry';

function App() {
  const location = useLocation(); // Get the current location
  // const { page } = useContext(userContext)
  
  
  // const pageNavigation = () => {
  //   if(page === "login") return <Login />
  //   if(page === "otp") return <OtpPage />
  //     if(page === "reset") return <ResetPasswordPage />
  //     }

  
  
  return (
    <>
      <Navbar />
      <div className=" flex bg-gray-50">
        {location.pathname === "/home" && <Sidebar />}
        <HomeLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/forgot-password" element={<UserPhoneEntry />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/add" element={<ProductForm />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </HomeLayout>
      </div>
    </>
  );
}

export default App;
