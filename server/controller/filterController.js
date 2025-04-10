// Import necessary modules (adjust as needed for your setup)
const Product = require('../model/productModal'); // Assuming you have a Product model

// Controller function for searching and filtering products
const searchFilter = async (req, res) => {
  try {
    const { search, minPrice, maxPrice } = req.query; // Extract query parameters

    console.log("req.query",req.query);
    
    // Build the filter object dynamically
    let filter = {};

    // Add search functionality (assuming product name )
    if (search) {
      filter.$or = [
        { Name: { $regex: search, $options: 'i' } } // Case-insensitive search for name
      ];
    }

    // Add price range filtering
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice); // Minimum price
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice); // Maximum price
    }

    // Fetch filtered products from the database
    const products = await Product.find(filter);

    // Return the results
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {searchFilter};
