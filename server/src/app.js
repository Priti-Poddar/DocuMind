import express from "express";
import cors from "cors";

import documentRoutes from "./routes/document.router.js"
import chatRoutes from "./routes/chat.router.js";
import conversationRoutes from "./routes/conversation.router.js";
import aiRoutes from "./routes/ai.router.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://docu-mind-three-chi.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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