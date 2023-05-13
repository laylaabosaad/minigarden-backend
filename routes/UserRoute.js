import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();


router.route("/login").post(UserController.loginUser);
router.route("/signup").post(UserController.signupUser);
router.route("/").get(UserController.getAllUsers);
router.route("/:id").delete(UserController.deleteUser);
router.route("/:id").put(UserController.editUser);
router.route("/:id").get(UserController.getuser)

export default router;
