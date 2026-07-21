# 📚 DocuMind – RAG Powered Document Q&A System

DocuMind is a full-stack AI-powered document intelligence platform that allows users to upload PDF documents and interact with them through natural language conversations. It leverages Retrieval-Augmented Generation (RAG) to provide context-aware responses by extracting relevant information from uploaded documents.

🔗 **Live Demo:** https://docu-mind-three-chi.vercel.app

---

## ✨ Features

- 📄 Upload PDF documents (up to 20 MB)
- 🤖 AI-powered conversational Q&A over documents
- 🔍 Semantic document retrieval using embeddings
- ⚡ Asynchronous PDF processing with Redis queues
- ☁️ AWS S3 object storage for scalable file management
- 💬 Persistent conversation history
- ✏️ Rename and delete conversations
- 🔎 Search conversations
- 📋 Copy AI responses
- 📝 Markdown rendering
- 📱 Responsive user interface
- 🚀 Fully deployed cloud-native architecture

---

## 🏗️ Architecture

```
                    React Frontend (Vercel)
                             │
                             ▼
                  Express API (Render)
                             │
          ┌──────────────────┴──────────────────┐
          ▼                                     ▼
      MongoDB Atlas                       AWS S3 Storage
          │                                     │
          └──────────────┬──────────────────────┘
                         ▼
                  Redis Cloud Queue
                         │
                         ▼
             Railway Background Worker
                         │
                         ▼
         PDF Parsing → Chunking → Embeddings
                         │
                         ▼
                 Gemini AI Response
```

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Markdown

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Redis Cloud
- AWS S3
- Google Gemini API
- Multer
- JWT Authentication

### Deployment
- Vercel
- Render
- Railway

---

## ⚙️ Workflow

1. User uploads a PDF.
2. PDF is stored securely in AWS S3.
3. Document metadata is saved in MongoDB.
4. A background job is pushed to Redis.
5. Railway worker downloads the PDF from S3.
6. PDF is parsed and chunked.
7. Embeddings are generated.
8. Users can ask questions about the uploaded document.

---

## 📂 Project Structure

```
DocuMind/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── workers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── models/
│   └── ...
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Priti-Poddar/DocuMind.git
cd DocuMind
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=

MONGODB_URI=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=

AWS_REGION=
AWS_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

GEMINI_API_KEY=
```

---

## 📸 Screenshots

Add screenshots here.

- Home Page
- Chat Interface
- Upload Screen
- Conversation History

---

## 🌟 Future Enhancements

- Multi-document chat
- OCR support for scanned PDFs
- Citation-based answers
- Streaming AI responses
- Folder management
- Team collaboration
- Role-based authentication

---

## 👩‍💻 Author

**Priti Poddar**

- GitHub: https://github.com/Priti-Poddar
- LinkedIn: https://www.linkedin.com/in/priti-poddar-/

---