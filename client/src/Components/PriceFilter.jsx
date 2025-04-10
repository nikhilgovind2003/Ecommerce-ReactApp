import React, { useContext, useState } from "react";
import axios from "axios";
import productContext from "./../context/productContext";

const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState("");

  const { setProducts } = useContext(productContext);
  const handleFilter = async () => {
    try {
      const [minPrice, maxPrice] = priceRange
        .split("-")
        .map((price) => parseFloat(price) || null);

        const res = await axios.get("http://localhost:3000/api/filter", {
            params: {
              minPrice,
              maxPrice,
            },
          });
          
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };





  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="0-50"
              onChange={(e) => setPriceRange(e.target.value)}
              className="mr-2"
            />
            $0 - $50
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="50-100"
              onChange={(e) => setPriceRange(e.target.value)}
              className="mr-2"
            />
            $50 - $100
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="100-200"
              onChange={(e) => setPriceRange(e.target.value)}
              className="mr-2"
            />
            $100 - $200
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="200-"
              onChange={(e) => setPriceRange(e.target.value)}
              className="mr-2"
            />
            $200+
          </label>
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
