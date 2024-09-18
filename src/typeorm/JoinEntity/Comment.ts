import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'Comment' })
export class Comment {
    @PrimaryGeneratedColumn()
    ID_comment: number;

    @ApiProperty()
    @Column({ type: 'text' })
    content: string;

    @ApiProperty()
    @Column({ type: 'int', default: 0 })
    rating: number;
}
