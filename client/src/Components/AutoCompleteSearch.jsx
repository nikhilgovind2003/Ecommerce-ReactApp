import React, { useContext, useState } from "react";
import productContext from "./../context/productContext";
import { Search } from "lucide-react";
import axios from "axios";

const AutocompleteSearch = () => {
  const { products, setProducts } = useContext(productContext); // Access products from context

  const [query, setQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    
    
  // Handle input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    // Filter suggestions based on query
    if (input.trim() === "") {
      setFilteredSuggestions([]); // Clear suggestions if input is empty
    } else {
      const filtered = products.filter(
        (product) => product.Name.toLowerCase().includes(input.toLowerCase()) // Filter by product name
      );
      setFilteredSuggestions(filtered); // Set filtered products
    }
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.Name); // Set the clicked suggestion's name as the query
    setFilteredSuggestions([]); // Clear suggestions after selection
  };

    
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/filter?search=${query}`);
        setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className=" flex items-center gap-4 w-full border border-gray-300 p-2 rounded-lg shadow focus:outline-blue-500">
        <div className="relative w-full">
          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search product name..."
            className="w-full  border-none outline-none"
          />

          {/* Suggestions Dropdown */}
          {filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)} // Pass the product object
                >
                  {suggestion.Name} {/* Display the product name */}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Search className=" hover:scale-110" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default AutocompleteSearch;
