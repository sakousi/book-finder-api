import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ApiQuery } from '@nestjs/swagger';
import { BookGenre } from 'src/typeorm/enum/bookGenre';
import { User } from "../user/entities/user.entity";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<{ message: string; data: Book }> {
    const book = this.bookRepository.create(createBookDto);
    const savedBook = await this.bookRepository.save(book);
    return {
      message: 'Book successfully created',
      data: savedBook,
    };
  }  

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { ID_book: id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  async getRecommendedBooks(): Promise<Book[]> {
    const userRates = await this.userRepository.find({ relations : ['rates'] });

    // Use reocomendation algorithm utils to get recommended books
    const recommendedBooks = getRecommendations(userRates, 1);


    return
  }
}
