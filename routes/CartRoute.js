import CartController from "../controllers/CartController.js";
import express from "express";

const router = express.Router();

router.route("/:id").get(CartController.getCartItems);
router.route("/").get(CartController.getAllCarts);
router.route("/:userId/:itemId").delete(CartController.deleteItem);

router.route("/:id").put(CartController.addCartProduct);
router.route("/:id").post(CartController.increaseinCart);


export default router;
