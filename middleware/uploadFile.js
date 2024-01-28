const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Function to create the destination directory if it doesn't exist
const ensureUploadsDirectory = (subdirectory) => {
  const uploadPath = path.join('uploads', subdirectory);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return uploadPath;
};

// Multer configuration function
const createMulterMiddleware = (subdirectory) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = ensureUploadsDirectory(subdirectory);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, uuidv4() + extension);
    },
  });

  return multer({ storage: storage });
};

module.exports = createMulterMiddleware;
