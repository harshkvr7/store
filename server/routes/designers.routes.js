import express from "express";
import {
  getAllDesigners,
  getDesignerById,
  createDesigner,
  updateDesigner,
  deleteDesigner,
} from "../controllers/designers.controller.js";

const router = express.Router();

router.get("/", getAllDesigners);
router.get("/:id", getDesignerById);
router.post("/", createDesigner);
router.put("/:id", updateDesigner);
router.delete("/:id", deleteDesigner);

export default router;
