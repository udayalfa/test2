import express from "express";
import { createJewellery, deleteJewellery, getAllJewellery, getFullJewelleryByCategory, getJewelleryByCategory, getJewelleryById, updateJewellery } from "../controllers/jewellaryController.js";
import upload from "../middlewares/upload.js";


const jewellaryRouter = express.Router();

jewellaryRouter.post("/", upload.array("images", 5), createJewellery);
jewellaryRouter.get("/", getAllJewellery);
jewellaryRouter.get("/all/:category", getJewelleryByCategory);
jewellaryRouter.get("/allDetails/:category", getFullJewelleryByCategory);
jewellaryRouter.get("/:id", getJewelleryById);
jewellaryRouter.delete("/:id", deleteJewellery);
jewellaryRouter.put("/:id",upload.array("updatedImages", 5), updateJewellery);

export default jewellaryRouter;
