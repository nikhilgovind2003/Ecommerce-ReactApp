import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Products from "./Products";
import productContext from "../context/productContext";

const ProductCarousel = () => {
 
  const {setProducts,products} = useContext(productContext)
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data.allProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="text-2xl font-semibold my-6 text-center text-gray-800">
        Explore Our Featured Products
      </h1>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 px-4 py-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-4 text-center text-lg text-red-500">
            No products found.
          </p>
        ) : (
          filteredProducts.map((item) => (
            <div key={item._id} className="relative p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out">
              <Products
                id={item._id}
                img={item.image}
                Name={item.Name}
                price={item.price}
                description={item.description}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductCarousel;
