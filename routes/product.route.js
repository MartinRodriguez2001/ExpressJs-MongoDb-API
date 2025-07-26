const express = require("express");
const router = express.Router();
const { authenticateToken, requireAdmin, requireOwnershipOrAdmin } = require("../middleware/auth.js");
const {
  getProducts,
  getProductById,
  updatedProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/product.controller.js");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", authenticateToken, requireAdmin, createProduct);
router.put("/:id", authenticateToken, requireAdmin,updatedProduct);
router.delete("/:id", authenticateToken, requireAdmin, deleteProduct);

module.exports = router;