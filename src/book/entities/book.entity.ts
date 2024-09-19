import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookUserList } from "src/typeorm/JoinEntity/BookUserList";
import { BookGenre } from "src/typeorm/enum/bookGenre";

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

    @ApiProperty({ enum: BookGenre })
    @Column({ type: 'enum', enum: BookGenre })
    book_genre: BookGenre;

    @ApiProperty()
    @Column({nullable: true})
    book_langue: string;

    @ApiProperty({ example: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/792px-Placeholder_book.svg.png', nullable: true })
    @Column({ nullable: true })
    book_image?: string;

    @OneToMany(() => BookUserList, bookUserList => bookUserList.book)
    list: BookUserList[];
}
