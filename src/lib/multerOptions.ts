import { MulterModuleOptions } from '@nestjs/platform-express';
import HttpError from 'exception/HttpError';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import getProcessEnv from './getProcessEnv';
import uuidRandom from './uuidRandom';

export const multerOptions: MulterModuleOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new HttpError(400, '지원하지 않는 이미지 형식입니다.'), false);
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath: string = 'public';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, uuidRandom(file));
    },
  }),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};

export const createImageURL = (file): string => {
  const serverAddress: string = getProcessEnv('SERVER_ADDRESS');
  return `${serverAddress}/public/${file.filename}`;
}