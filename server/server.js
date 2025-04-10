const express = require("express");
const dbConnect = require("./config/dbConfig");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const verifyToken = require("./middleware/verifyToken");
const productRouter = require("./router/productRouter");
const userRouter = require("./router/userRouter");
const cartRouter = require("./router/cartRouter");
const filterRouter = require("./router/filterRouter");
const productModal = require("./model/productModal");

const app = express();
dbConnect();

// Serve the uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware for parsing request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routing middleware
app.use("/api/auth", userRouter);
app.use("/api/products", verifyToken, productRouter);
app.use("/api/cart", verifyToken, cartRouter);
app.use("/api/filter", filterRouter);

// app.use("/api/cart", cartRouter);
// Start the server

app.listen(process.env.PORT, () => {
  console.log(`Server starts at port ${process.env.PORT}`)
});