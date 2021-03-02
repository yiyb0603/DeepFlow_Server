import { Injectable } from "@nestjs/common";
import { createImageURL } from "lib/multerOptions";

@Injectable()
export default class UploadService {
  public uploadFiles(files: File[]): string[] {
    let generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles = [
        ...generatedFiles,
        createImageURL(file),
      ];
    }

    return generatedFiles;
  }
}