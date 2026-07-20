import { Router } from "express";

import upload from "../middleware/upload.middleware.js";

import { uploadDocument } from "../controllers/document.controller.js";

const router = Router();

router.post("/upload", upload.single("document"), uploadDocument);

export default router;
 