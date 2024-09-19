import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookUserList } from './typeorm/JoinEntity/BookUserList';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { Book } from './book/entities/book.entity';
import { User } from './user/entities/user.entity';
import { Blog } from './blog/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: process.env.NODE_ENV === 'production' ? undefined : 3306,
      username: 'root',
      password: 'yanis8315',
      database: 'book-finder',
      entities: [
        Book,
        BookUserList,
        User,
        Blog
      ],
      synchronize: true
    }),
    BookModule,
    UserModule,
    BlogModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
