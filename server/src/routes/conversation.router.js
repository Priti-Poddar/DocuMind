import express from "express";

import {
  create,
  getOne,
  history,
  getByDocument,
  getConversations,
  renameConversation,
  removeConversation
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", create);

router.get("/document/:documentId/all", getConversations);

router.get("/document/:documentId", getByDocument);

router.get("/:id/messages", history);

router.patch("/:id/title", renameConversation);

router.get("/:id", getOne);
router.delete("/:id", removeConversation);

export default router;
