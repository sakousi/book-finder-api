import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { bucket } from 'src/firebase.config';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseInterceptors(FileInterceptor('blog_image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create blog',
    type: CreateBlogDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto
  ) {
    let filePath = null;

    if (file) {
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.originalname}`;
      const fileUpload = bucket.file(filename);

      await new Promise((resolve, reject) => {
        const stream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        stream.on('error', (err) => {
          reject(err);
        });

        stream.on('finish', async () => {
          await fileUpload.makePublic();
          filePath = fileUpload.publicUrl();
          resolve(null);
        });

        stream.end(file.buffer);
      });
    }

    return this.blogService.create({ ...createBlogDto, blog_image: filePath });
  }

  @Get()
  async findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
