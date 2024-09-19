import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../book/entities/book.entity";
import { User } from "../../user/entities/user.entity";

@Entity({ name: 'Rate' })
export class Rate {
  @PrimaryGeneratedColumn()
  ID_rate: number;

  @ApiProperty()
  @Column()
  rate_value: number;

  @ApiProperty()
  @Column({nullable: true})
  comment?: string;

  @ApiProperty()
  @Column()
  rate_date: Date;

  @ManyToOne(() => Book, (book) => book.list)
  @JoinColumn({ name: 'ID_book' })
  book: Book;

  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn({ name: 'ID_user' })
  user: User;
}
