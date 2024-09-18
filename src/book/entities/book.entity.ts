import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookUserList } from "src/typeorm/JoinEntity/BookUserList";

@Entity({ name: 'Book' })
export class Book {
    @PrimaryGeneratedColumn()
    ID_book: number;

    @ApiProperty()
    @Column()
    book_title: string;

    @ApiProperty()
    @Column()
    book_author: string;

    @ApiProperty()
    @Column()
    book_editor: string;

    @ApiProperty()
    @Column({type: 'text', nullable: true})
    book_description: string;

    @OneToMany(() => BookUserList, bookUserList => bookUserList.book)
    list: BookUserList[];
}
