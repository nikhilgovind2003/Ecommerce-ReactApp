const cartModel = require("../model/cartModel");
const productModel = require("../model/productModal");
const userModel = require("../model/userModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assume user ID is available in the request
    const { productId, count } = req.body; // The product ID to add to the cart
console.log(productId, count);

    // Validate input
    if (!productId || typeof productId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid productId",
      });
    }

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the product is already in the cart
    const existingProduct = user.cartData.find(
      (item) => item.cartId && item.cartId.toString() === productId
    );

    if (existingProduct) {
      // If the product is already in the cart, increment the count
      existingProduct.count += count;
    } else {
      // If the product is not in the cart, add it
      user.cartData.push({
        cartId: productId,
        count: count,
      });
    }

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const displayCartData = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartData = await userModel
      .findOne({ _id: userId })
      .populate('cartData.cartId');

    res.status(200).json({
      success: true,
      message: "All product Data is here",
      cartData: cartData.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    const { productId } = req.body; // Get productId from the request body

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({  // Return 400 if productId is missing
        success: false,
        message: "Product ID is required to remove from cart",
      });
    }

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({  // Return 404 if user is not found
        success: false,
        message: "User not found",
      });
    }

    // Find the product in the user's cart
    const productIndex = user.cartData.findIndex(
      (item) => item.cartId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({  // Return 404 if product is not in cart
        success: false,
        message: "Product not found in cart",
      });
    }

    // Remove the product from the cart
    user.cartData.splice(productIndex, 1);

    // Save the updated user data
    await user.save();

    res.json({
      success: true,
      message: "Product removed from cart",
      cartData: user.cartData, // Optionally return updated cart data
    });
  } catch (error) {
    // Catch any errors that occur
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addToCart, displayCartData, removeFromCart };
