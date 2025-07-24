const express = require("express");
const router = express.Router();
const {
  getUserById,
  getUsers,
  createUser,
  deleteProduct,
  updatedUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updatedUser);
router.delete("/:id", deleteProduct);

module.exports = router;
