import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BookUserList } from "src/typeorm/JoinEntity/BookUserList";


@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    ID_user: number;

    @ApiProperty()
    @Column()
    user_username: string;

    @ApiProperty({default: null})
    @Column()
    user_firstname: string;

    @ApiProperty({default: null})
    @Column()
    user_lastname: string;

    @ApiProperty()
    @Column()
    user_mail: string;

    @ApiProperty()
    @Column({default: null})
    year: number;

    @ApiProperty()
    @Column({ default: 'https://i.ibb.co/3YG2XmX/avatar.png' })
    avatar: string;

    @ApiProperty()
    @Column({ type: 'text', default: null })
    biography: string;

    @ApiProperty()
    @Column({default: null})
    user_phone: string;

    @ApiProperty()
    @Column({default: null})
    user_work: string;

    @ApiProperty()
    @Column()
    password: string;

    @OneToMany(() => BookUserList, bookUserList => bookUserList.user)
    book_user_list: BookUserList[];

}
