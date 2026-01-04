import express from "express"
import { sendBuildYourOwn , sendContactMail } from "../controllers/contactController.js";
import upload from "../middlewares/upload.js";

const contactRouter = express.Router();

contactRouter.post("/", sendContactMail);
contactRouter.post("/build", upload.single("image"), sendBuildYourOwn);

export default contactRouter;
