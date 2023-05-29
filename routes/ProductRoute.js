import express from "express";
import ProductController from "../controllers/ProductController.js";
import catupload from "../middleware/catupload.js";
import isAuthenticated from "../middleware/userAuthMiddleware.js.js";
const router = express.Router();

router.route("/").get(ProductController.getProduct);
router
  .route("/add")
  .post(
    catupload.single("image"),
    isAuthenticated,
    ProductController.addProduct
  );
router.route("/:id").delete(isAuthenticated, ProductController.deleteProduct);
router.route("/:id").put(isAuthenticated, ProductController.updateProduct);
router.route("/:id").get(ProductController.getOneProduct);
router
  .route("/bycategory/:categoryId")
  .get(ProductController.getproductByCategory);
router.route("/bysub/:subcatid").get(ProductController.getproductBySubcategory);
export default router;
