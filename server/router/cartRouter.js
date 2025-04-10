const express = require('express')
const { addToCart, displayCartData, removeFromCart } = require('../controller/cartController')

const router = express.Router()


router.post("/", addToCart)
router.get("/", displayCartData)
router.delete("/remove", removeFromCart)

module.exports = router