import express from "express";
import {
  getAllClothes,
  getClothById,
  createCloth,
  updateCloth,
  deleteCloth,
} from "../controllers/clothes.controller.js";

const router = express.Router();

router.get("/", getAllClothes);
router.get("/:id", getClothById);
router.post("/", createCloth);
router.put("/:id", updateCloth);
router.delete("/:id", deleteCloth);

export default router;
