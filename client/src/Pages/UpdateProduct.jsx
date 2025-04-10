// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     Name: "",
//     price: "",
//     description: "",
//     file: null,
//   });

//   // Fetch the current product data when the component mounts
//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/api/products/${id}`, {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });

//         console.log(res.data);
        
//         if (res.data && res.data.productById) {
//           const { Name, price, description, image } = res.data.productById;
//           setFormData({
//             Name,
//             price,
//             description,
//             file: image || null, // Prepopulate the image if available
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };

//     fetchProductData();
//   }, [id, token]);

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       file: e.target.files[0], // Update the file when user selects a new one
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("Name", formData.Name);
//     data.append("price", formData.price);
//     data.append("description", formData.description);
//     data.append("file", formData.file);

//     try {
//       if (!token) {
//         console.log("No token provided");
//         return;
//       }

//       const res = await axios.patch(
//         `http://localhost:3000/api/products/${id}`,
//         data,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       if (res.data.status) {
//         console.log("Product updated successfully");
//         alert("Product updated successfully");
//         navigate("/home"); // Navigate to home page after successful update
//       } else {
//         alert("Failed to update the product");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("There was an error updating the product. Please try again.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="m-5">
//       <h2 className="text-2xl font-bold mb-5">Update Product</h2>
//       <form onSubmit={handleSubmit} className="max-w-md space-y-5">
//         <div>
//           <label
//             htmlFor="Name"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Product Name:
//           </label>
//           <input
//             type="text"
//             id="Name"
//             name="Name"
//             value={formData.Name} // Prepopulate with fetched value
//             onChange={handleChange}
//             placeholder="Enter product name"
//             className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="price"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Price:
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price} // Prepopulate with fetched value
//             onChange={handleChange}
//             placeholder="Enter the price"
//             className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Description:
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description} // Prepopulate with fetched value
//             onChange={handleChange}
//             rows="5"
//             placeholder="Enter product description"
//             className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-500"
//           ></textarea>
//         </div>

//         <div>
//           <label
//             htmlFor="file"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Upload File:
//           </label>
//           <input
//             type="file"
//             id="file"
//             name="file"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
