import ContactUsController from "../controllers/ContactUsController.js";
import express from "express";

const router = express.Router();

router.route("/add").post(ContactUsController.addContact);
router.route("/").get(ContactUsController.getContactinfo);
router.route("/:id").put(ContactUsController.editContact);

export default router;
