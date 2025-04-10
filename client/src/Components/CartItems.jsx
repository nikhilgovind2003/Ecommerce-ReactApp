import axios from "axios";
import { useEffect } from "react";

const CartItems = ({ item, count, removeItemFromCart }) => {
  const token = localStorage.getItem("token");

  let productId = item._id;

  const removeItem = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/api/cart/remove", {
        headers: { Authorization: "Bearer " + token },
        data: { productId },
      });

      if (res.data.success) {
        alert("Do you want to remove item")
        removeItemFromCart(productId); // Update the UI state by removing the item
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex border-2 rounded-lg justify-between items-center p-4 border-b mb-4 border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={`http://localhost:3000/${item.image}`}
          alt={item.Name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.Name}</h3>
          <p className="text-sm text-gray-600">Price: ${item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className=" rounded-full bg-blue-500 text-white px-4 py-1 font-bold ">{count}</div>
        <button
          onClick={removeItem}
          className=" bg-red-500 text-white rounded-md px-4 py-1 hover:scale-105 hover:bg-red-600 font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItems;
