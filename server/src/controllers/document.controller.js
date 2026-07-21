import { createDocument } from "../services/document/document.service.js";

import { getAllDocuments } from "../services/document/document.service.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await getAllDocuments();

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "No PDF uploaded",
      });
    }

    const document = await createDocument(req.file);

    return res.status(202).json({
      success: true,

      message: "oaded successfully. Processing started.",

      data: {
        documentId: document._id,

        jobId: document.jobId,

        status: document.status,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};
