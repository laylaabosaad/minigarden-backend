import express from "express";
import ProductController from "../controllers/ProductController.js";
import catupload from "../middleware/catupload.js";

const router = express.Router();

router.route("/").get(ProductController.getProduct);
router.route("/add").post(catupload.single('image'), ProductController.addProduct);
router.route("/:id").delete(ProductController.deleteProduct);
router.route("/:id").put(ProductController.updateProduct);
router.route("/:id").get(ProductController.getOneProduct);
router.route("/bycategory/:categoryId").get(ProductController.getproductByCategory);

export default router;
