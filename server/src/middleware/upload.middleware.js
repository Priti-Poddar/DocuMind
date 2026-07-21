import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "src/uploads");
//   },

//   filename(req, file, cb) {
//     const extension = path.extname(file.originalname);

//     cb(null, `${uuid()}${extension}`);
//   },
// });

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (extension !== ".pdf") {
    return cb(new Error("Only PDF files are allowed."));
  }

  cb(null, true);
};

const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;
