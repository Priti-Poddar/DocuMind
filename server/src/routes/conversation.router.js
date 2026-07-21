import express from "express";

import {
  create,
  getOne,
  history,
  getByDocument
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", create);
router.get("/document/:documentId", getByDocument);

router.get("/:id", getOne);

router.get("/:id/messages", history);

export default router;
