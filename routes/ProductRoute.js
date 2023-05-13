import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

router.route("/").get(ProductController.getProduct);
router.route("/add").post(ProductController.addProduct);
router.route("/:id").delete(ProductController.deleteProduct);
router.route("/:id").put(ProductController.updateProduct);
router.route("/:id").get(ProductController.getOneProduct);
router.route("/bycategory/:categoryId").get(ProductController.getproductByCategory);

export default router;
