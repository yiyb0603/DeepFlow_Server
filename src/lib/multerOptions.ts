import HttpError from "exception/HttpError";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import getProcessEnv from "./getProcessEnv";
import uuidRandom from "./uuidRandom";

export const multerOptions = {
  fileFilter: (request, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(new HttpError(400, '지원하지 않는 파일 형식입니다.'), false);
    }
  },

  storage: diskStorage({
    destination: (request, file, cb) => {
      const uploadPath: string = 'public';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      cb(null, uploadPath);
    },

    filename: (request, file, cb) => {
      cb(null, uuidRandom(file));
    }
  })
}

export const createImageURL = (file): string => {
  const serverAddress: string = getProcessEnv('SERVER_ADDRESS');
  return `${serverAddress}/public/${file.filename}`;
}