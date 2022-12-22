const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  removeProduct,
} = require("../controller/productController");

router.route("/").post(addProduct);
router.route("/").get(getAllProducts);
router.route("/:id").put(updateProduct);
router.route("/").delete(removeProduct);
module.exports = router;
