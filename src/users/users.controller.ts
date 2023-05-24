import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from 'src/post/helpers/image.helper';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServicer: UsersService) {}

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const userId = req['user']['userId'];
          const userFolder = `./storage/${userId}`;

          if (!existsSync(userFolder)) {
            mkdirSync(userFolder);
          }

          cb(null, userFolder);
        },
        filename: renameImage,
      }),
      fileFilter: fileFilter,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
    @Req() req,
  ) {
    if (!file) {
      const response = this.userServicer.update(id, updateUserDto);
      return res.status(200).json(response);
    }
    const response = this.userServicer.update(id, {
      ...updateUserDto,
      fileUrl: `/uploads/${req['user'].userId}%2F${file.filename}`,
    });
    return res.status(200).json(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    return res.json(await this.userServicer.findOne(id));
  }
}
