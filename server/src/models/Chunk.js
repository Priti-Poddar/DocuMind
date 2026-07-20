import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      index: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    wordCount: {
      type: Number,
      required: true,
    },

    embedding: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Chunk", chunkSchema);
