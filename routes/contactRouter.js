import express from "express";
import {
  sendBuildYourOwn,
  sendContactMail,
  sendOrderMail,
} from "../controllers/contactController.js";
import upload from "../middlewares/upload.js";

const contactRouter = express.Router();

contactRouter.post("/", sendContactMail);
contactRouter.post("/build", upload.single("image"), sendBuildYourOwn);
contactRouter.post("/order", sendOrderMail);

export default contactRouter;
