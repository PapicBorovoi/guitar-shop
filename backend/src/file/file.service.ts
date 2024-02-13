import { Injectable } from '@nestjs/common';
import 'multer';
import { writeFile } from 'node:fs/promises';
import { join } from 'path';
import { ensureDir } from 'fs-extra';

@Injectable()
export class FileService {
  public async upload(file: Express.Multer.File) {
    try {
      await ensureDir(join('static'));
      await writeFile(join('static', file.originalname), file.buffer);

      return {
        url: `http://localhost:3000/${file.originalname}`,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error while uploading file');
    }
  }
}
