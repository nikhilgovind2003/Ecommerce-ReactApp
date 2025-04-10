const express = require("express");
const upload = require("../utils/multer")
const {
  getAllProducts,
  addProduct,
  deleteProductById,
  updateById,
  getProductById,
} = require("../controller/productController");
const verifyToken = require("../middleware/verifyToken");

// express router
const router = express.Router();

// Product Endpoints...
router.get("/", getAllProducts);
router.post("/add", upload.single('file'), addProduct);
router.delete("/:id", deleteProductById);
router.patch("/:id",upload.single('file'), updateById);
router.get("/:id", getProductById);

// Export
module.exports = router;
