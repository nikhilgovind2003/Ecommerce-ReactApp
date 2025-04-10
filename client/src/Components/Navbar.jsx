import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import productContext from "../context/productContext";

const Navbar = () => {



  const {cart} = useContext(productContext)
  

  return (
    <>
      <div className="bg-white fixed w-full shadow-md z-10 items-center py-4 md:px-64">
        <div className=" flex items-center justify-between">
          <div className="w-[60px] pl-4">
            <img
              src="https://recommerceeco.com/wp-content/uploads/2023/09/Recommerce-Watermark-01.png"
              alt=""
            />
          </div>
          <ul className="flex justify-around w-[500px] font-semibold text-sm md:text-md">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
            <Link to="/add">Add Product</Link>
           </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/cart">
                  
                  <div className=" relative">
                  {
                    cart.length>0?
                    <p className=" absolute bg-red-500 text-white rounded-full tex-xs top-[-10px] right-[-10px] px-[5px]">{cart.length}</p>
                  : <></>
                }
                <ShoppingCart />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
