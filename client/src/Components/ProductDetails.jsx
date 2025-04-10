import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [count, setCount] = useState(0)
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

console.log(productDetails);


  const addToCart = async (productId) => {
    alert("Cart added successfully");
    navigate("/cart");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart",
        { productId, count },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("success", res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductDetails(data.productById);
    } catch (error) {
      console.log(error.message);
    }
  };



  const onIncreaseQuantity = (prev) => {
    setCount(prev=> prev+1)
  }

  const onDecreaseQuantity = (prev) => {
    setCount(prev=> prev-1)
  }







  useEffect(() => {
    fetchData(id);
  }, [id]);





  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6 border">
        {/* Product Image */}
        <div className="w-full flex items-center justify-center">
          <img
            className="w-96 h-96 object-contain rounded-md"
            src={`http://localhost:3000/${productDetails.image}`}
            alt={productDetails.Name || "Product Image"}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {productDetails.Name || "Product Name"}
            </h1>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              INR {productDetails.price || "Price"}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {productDetails.description ||
                "No description available for this product."}
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6">
            {count > 0 ? (
              <div>

             <div className="flex items-center space-x-2">
             <button
               className="px-2 py-1 border rounded-md text-gray-600"
               onClick={onDecreaseQuantity}
             >
               -
             </button>
             <span className="px-2">{count}</span>
             <button
               className="px-2 py-1 border rounded-md text-gray-600"
               onClick={onIncreaseQuantity}
             >
               +
             </button>
                </div>
                
                <button onClick={()=> addToCart(productDetails._id)} className=" text-center bg-red-500  text-white px-4 py-1 mt-4 rounded-md">Submit</button>

            </div>
            ) : (
              <button
                onClick={onIncreaseQuantity}
                className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all shadow-lg"
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
