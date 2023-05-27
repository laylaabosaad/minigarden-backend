import express from "express";
import UserContactUs from "../controllers/UserContactUs.js";

const router = express.Router();

router.route("/").post(UserContactUs.sendmessage);
router.route("/").get(UserContactUs.getUsermssg);
router.route("/:id").delete(UserContactUs.deletemssg);

export default router;
