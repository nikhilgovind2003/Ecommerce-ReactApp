const express = require("express");
const { searchFilter } = require("../controller/filterController");

const router = express.Router()

router.get('/', searchFilter)

module.exports = router