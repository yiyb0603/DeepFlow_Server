import { Injectable } from '@nestjs/common';
import { createImageURL } from 'lib/multerOptions';

@Injectable()
export default class UploadService {
  public uploadFiles(files: File[]): string[] {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(createImageURL(file));
    }

    return generatedFiles;
  }
}