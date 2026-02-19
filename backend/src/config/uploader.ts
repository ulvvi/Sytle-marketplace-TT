import { Request } from "express";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: function (request: Request, file, callBack) {
    let destinationFolder;

    if (file.mimetype.startsWith("video/")) {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "videos");
    } else if (file.mimetype.startsWith("audio/")) {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "audios");
    } else {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "photos");
    }

    callBack(null, destinationFolder);
  },
  filename: function (request:Request, file, callBack) {
  

    callBack(null,Date.now() + "_" + file.originalname)

  },
});

const photoUpload = multer({
  storage: storage,
  limits: {

    fileSize: 1024 * 1024 * 50,
    files: 9,
  },
  fileFilter: function (request: Request, file, callBack) {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedFileTypes.includes(file.mimetype)) {
      const messsage = "Somente PNG, JPEG e JPG são suportados!";

      return callBack(new Error());
    }

    callBack(null, true); // Aceita o arquivo, caso seja do tipo suportado
  },
});

export default photoUpload;