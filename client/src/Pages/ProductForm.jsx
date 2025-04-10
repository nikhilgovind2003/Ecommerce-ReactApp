import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  
  const navigate = useNavigate()
  

  const [formData, setFormData] = useState({
    Name: "",
    price: "",
    description: "",
    file: null,
  });

console.log(formData.file);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Name", formData.Name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("file", formData.file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/products/add", data, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });

      if (res.data.success) {
        alert("Product added successfully")
        navigate("/home")
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-5 mx-auto w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-5">Add Product</h2>
      <form onSubmit={handleSubmit} className=" w-[50%] space-y-5 ">
        <div>
          <label
            htmlFor="Name"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            price:
          </label>

          <input
            type='number'
            id="price"
            name='price'
            placeholder="Enter the price"
            value={formData.price}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-500"
    
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter product description"
            required
            className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Upload File:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
