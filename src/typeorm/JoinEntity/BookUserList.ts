import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserState } from "../enum/UserState";
import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'BookUserList' })
export class BookUserList {
    @PrimaryGeneratedColumn()
    ID_bookUserList: number;

    @ApiProperty({ enum: UserState })
    @Column({ type: 'enum', enum: UserState })
    user_state: UserState;

    @ManyToOne(() => User, user => user.book_user_list)
    user: User;

    @ManyToOne(() => Book, book => book.list)
    book: Book;
}
