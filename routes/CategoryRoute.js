import Category from "../controllers/CategoryControllers.js";
import express from "express";
const router = express.Router()

router.route("/add").post(Category.addCategory)
router.route("/:id").get(Category.getCategory)
router.route("/").get(Category.getAll)
router.route("/:id").delete(Category.deleteCategory)
router.route("/:id").put(Category.editCategory)

export default router