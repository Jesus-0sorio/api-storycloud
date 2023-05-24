import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { fileFilter, renameImage } from './helpers/image.helper';
import { PostService } from './post.service';

@ApiTags('post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const userId = req['user']['userId'];
          const userFolder = `./storage/${userId}`;

          if (!existsSync('./storage')) {
            mkdirSync('./storage');
          }

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
  async create(
    @Req() req,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    return res.status(201).json(
      this.postService.create({
        create_by: req['user'].userId,
        fileName: file.filename,
        fileUrl: `/uploads/${req['user'].userId}%2F${file.filename}`,
        ...createPostDto,
      }),
    );
  }

  @Get()
  async findAll(@Res() res) {
    return res.status(200).json(await this.postService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    return res.status(200).json(await this.postService.findOne(id));
  }

  @Get('user/:id')
  async findUserPost(@Param('id') id: string, @Res() res) {
    return res.status(200).json(await this.postService.findUserPost(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res,
    @Req() req,
  ) {
    return res.status(200).json(
      await this.postService.update(id, {
        ...updatePostDto,
        userID: req['user'].userId,
      }),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    return res.status(204).json(await this.postService.remove(id));
  }
}
