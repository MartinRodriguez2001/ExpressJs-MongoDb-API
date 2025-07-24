const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  updatedProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/product.controller.js");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updatedProduct);
router.delete("/:id", deleteProduct);

module.exports = router;