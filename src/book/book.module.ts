import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
