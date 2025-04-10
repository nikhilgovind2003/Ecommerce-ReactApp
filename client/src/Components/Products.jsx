import { Link } from "react-router-dom";

const Products = ({ id, img, Name, price, description }) => {
  return (
    <div className="rounded-lg transition-all duration-300 ease-in-out px-4 bg-white">
      {/* Image Section */}
      <div className="mb-4 flex items-center justify-center">
        <img
          className="mx-auto w-64 h-44 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
          src={`http://localhost:3000/${img}`}
          alt={Name}
        />
      </div>

      {/* Product Information */}
      <div className="relative pb-2">
          <h4 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">{Name}</h4>
          <h5 className="text-md my-2 font-semibold text-gray-700">INR {price}</h5>

        <p className="text-sm mt-2 text-gray-600">{description.length > 100 ? description.substring(0, 100) + "..." : description}</p>
      </div>

      {/* View Button */}
      <Link to={`/product/${id}`} className="w-full mt-4 flex justify-center">
        <button className="bg-blue-600 w-full text-white px-6 py-2 rounded-lg shadow-md transform transition-all duration-300 hover:bg-blue-700 hover:scale-105">
          View Product
        </button>
      </Link>
    </div>
  );
};

export default Products;
