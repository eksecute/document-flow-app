import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import {Iconv} from 'iconv'

const iconv = new Iconv( "UTF-16", "UTF-8");

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './fileStore',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`)
          // cb(null, iconv.convert(file.originalname.toString())).toString('utf8')
          // cb(null, file.originalname)
        }
      })
    })
    // FileInterceptor('file', {
    //   dest: './fileStore',
    // }),
  )
  async uploadSingle(@UploadedFile() file) {
    console.log(file);

    const response = {
      originalname: typeof file.originalname,
      filename: file.filename,
      iconv: iconv.convert(file.originalname).toString('utf8')
    };
    return response;
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('photos[]', 10, {
      dest: './uploads',
    }),
  )
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }
}
