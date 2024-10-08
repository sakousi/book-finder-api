import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { bucket } from 'src/firebase.config';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(FileInterceptor('book_image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create book',
    type: CreateBookDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto,
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

    return this.bookService.create({ ...createBookDto, book_image: filePath });
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('recommended')
  async getRecommendedBooks(): Promise<Book[]> {
    return this.bookService.getRecommendedBooks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(+id);
  }
}
