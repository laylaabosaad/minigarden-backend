import express from "express";
import OrderController from "../controllers/OrderController.js";

const router = express.Router()

router.route("/").get(OrderController.getAllOrders)
router.route("/:id").post(OrderController.checkout);
router.route("/:id").delete(OrderController.deleteOrder)
router.route("/clientorder/:userId").get(OrderController.getClientOrder)





export default router