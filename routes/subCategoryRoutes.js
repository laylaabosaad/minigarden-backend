import subCategory from "../controllers/subCategory.js";
import express from "express";

const router = express.Router()

router.route("/add").post(subCategory.addsubcategory)
router.route("/").get(subCategory.getallSub)
router.route("/:id").delete(subCategory.deleteSub)
router.route("/:id").get(subCategory.getASub);
router.route("/:id").put(subCategory.updateSubcategory)

export default router