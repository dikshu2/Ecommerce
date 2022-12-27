const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  removeProduct,
  addProductReview,
  getReviews,
  deleteReviews,
} = require("../controller/productController");
const { isAuthenticated, authorizedRole } = require("../middleware/auth");

router.route("/").post(isAuthenticated, authorizedRole("admin"), addProduct);
router.route("/").get(isAuthenticated, getAllProducts);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(removeProduct);
router.route("/review/add").put(isAuthenticated, addProductReview);
router.route("/review/get/:id").get(getReviews);
router.route("/review/remove/:id").delete(isAuthenticated, deleteReviews);
module.exports = router;
