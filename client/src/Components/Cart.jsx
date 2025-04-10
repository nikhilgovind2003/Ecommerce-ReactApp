import { useContext, useEffect, useState } from "react";
import CartItem from "./CartItems";
import productContext from "../context/productContext";

const CartPage = () => {


  const {cart, setCart, fetchCarts} = useContext(productContext)
  const [total, setTotal] = useState(0)


  


  let sum = 0
  cart.map(item => {
    sum += item.cartId.price * item.count
  })

  const removeItemFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartId._id !== productId)
    );
  };

  useEffect(() => {
    fetchCarts();
  }, []);



  return (
    <div className="mx-auto p-4">
      <h1 className=" text-center text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="bg-white rounded-lg">
        {cart.map((item, index) => (
          <CartItem
            key={index}
            item={item.cartId}
            count={item.count}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
        {cart.length === 0 && (
          <p className="p-4 text-center text-white bg-blue-500 rounded-md font-semibold">Your cart is empty.</p>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center bg-gray-50 p-4 shadow rounded-lg border-2">
        <h2 className="text-lg font-medium">Total: ${sum.toFixed(2)}</h2>
        <button className=" font-semibold hover:scale-105 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
