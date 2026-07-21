import {
  createConversation,
  getConversation,
  findConversationByDocument,
  getConversationsByDocument,
  updateConversationTitle,
  deleteConversation
} from "../services/conversation/conversation.service.js";
import { getMessages } from "../services/message/message.service.js";

export const create = async (req, res) => {
  try {
    const { documentId, title } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "documentId is required.",
      });
    }

    const conversation = await createConversation(documentId, title);

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const conversation = await getConversation(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    res.json({
      success: true,
      conversation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const history = async (req, res) => {
  try {
    const messages = await getMessages(req.params.id, 100);

    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getByDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const conversation = await findConversationByDocument(documentId);

    if (!conversation) {
      return res.json({
        success: true,
        conversation: null,
      });
    }

    return res.json({
      success: true,
      conversation,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const { documentId } = req.params;

    const conversations = await getConversationsByDocument(documentId);

    return res.json({
      success: true,
      conversations,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const renameConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const conversation = await updateConversationTitle(id, title);

    return res.json({
      success: true,
      conversation,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeConversation = async (req, res) => {
  //  console.log("DELETE conversation:", req.params.id);
  try {
    await deleteConversation(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    // console.error("DELETE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};