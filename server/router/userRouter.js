const express = require('express')
const verifyToken = require("../middleware/verifyToken");
const { login, register, resetPassword, sendOtp, verifyOtp } = require('../controller/userController')
const router = express()


router.post("/login", login)
router.post("/register", register)
router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", resetPassword);

module.exports = router
