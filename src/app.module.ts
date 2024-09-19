import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookUserList } from './typeorm/JoinEntity/BookUserList';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { Book } from './book/entities/book.entity';
import { User } from './user/entities/user.entity';
import { RateModule } from './rate/rate.module';
import * as process from 'node:process';
import { Rate } from './rate/entities/rate.entity';
import { Blog } from './blog/entities/blog.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Book, BookUserList, User, Blog, User, Rate],
      synchronize: true,
    }),
    BookModule,
    UserModule,
    BlogModule,
    RateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
