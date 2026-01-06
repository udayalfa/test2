import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "jewellery",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
    transformation: [
      {
        width: 800,
        height: 800,
        crop: "limit",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
    tags: ["jewellery", "product"],
  }),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 5,
    fileSize: 3 * 1024 * 1024, // ✅ 3MB MAX
  },
});

export default upload;
