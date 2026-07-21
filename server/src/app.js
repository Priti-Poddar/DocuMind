import express from "express";
import cors from "cors";

import documentRoutes from "./routes/document.router.js"
import chatRoutes from "./routes/chat.router.js";
import conversationRoutes from "./routes/conversation.router.js";
import aiRoutes from "./routes/ai.router.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/ai", aiRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to DocuMind API"
    });
});


export default app;