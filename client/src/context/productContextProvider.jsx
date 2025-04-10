import { useState } from "react";
import productContext from "./productContext";
import axios from "axios";

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);


  const token = localStorage.getItem("token");

  const fetchCarts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCart(res.data.cartData);
      console.log(res.data.cartData);
    } catch (error) {
      console.log(error);
    }
  };

  
  const object = {
    products,
    setProducts,
    cart,
    setCart,
    fetchCarts,
  };

  return (
    <productContext.Provider value={object}>{children}</productContext.Provider>
  );
};
