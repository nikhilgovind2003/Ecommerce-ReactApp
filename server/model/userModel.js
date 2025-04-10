const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      otp: {
        type: String,
      },
      sendTime: {
        type: Number,
      },
      expiresAt: {
        Type: Number,
      },
    },
    cartData: [
      {
        cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        count: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  }
);

module.exports = mongoose.model("User", userSchema);
