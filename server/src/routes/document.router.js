import { Router } from "express";

import upload from "../middleware/upload.middleware.js";

import { uploadDocument, getDocuments } from "../controllers/document.controller.js";

const router = Router();

router.get("/", getDocuments);
router.post("/", upload.single("document"), uploadDocument);

export default router;
 