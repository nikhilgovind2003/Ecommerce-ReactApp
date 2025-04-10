const productModal = require("../model/productModal");
const fs = require("fs");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModal.find();

    res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (err) {
    console.log(err.message);

    res
      .status(404)
      .json({ success: false, message: "Internal server error..." });
  }
};

const addProduct = async (req, res) => {
  try {
    const { Name, price, description } = req.body;
    if (!Name || !price || !description) {
      return res.status(400).json({ message: "Enter all fields..." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File upload is required" });
    }

    const imagePath = `uploads/${req.file.filename}`;

    const products = new productModal({
      Name,
      price,
      description,
      image: imagePath,
    });

    await products.save();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModal.findByIdAndDelete({ _id: id });

    if (product.image) {
      fs.unlink(product.image, (err) => {
        console.log(err);
      });
    }

    const otherProducts = await productModal.find();

    return res.status(200).json({
      success: true,
      otherProducts,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const imagePath = req.file ? `uploads/${req.file.filename}` : undefined;

    
    const updateData = { ...data };
  if (req.file) {
      const prevData = await productModal.findOne({ _id: id });
      if (prevData.image) {
        fs.unlink(prevData.image, (err) => {
          if (err) {
            return res.status(404).json({
              success: false,
              message: "No file found!!!",
            });
          }

        });
      }

      updateData.image = imagePath;
    }

    const product = await productModal.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Data updated successfully...",
      product,
    });
  } catch (err) {
    // Log and respond to any errors that occur
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await productModal.findById(id);

    if (!productById)
      res.status(201).json({
        message: "Product not found",
      });

    return res.status(200).json({
      success: true,
      message: "Product get by Id",
      productById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteProductById,
  updateById,
  getProductById,
};
