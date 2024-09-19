import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'Blog' })
export class Blog {
    @PrimaryGeneratedColumn()
    ID_blog: number;

    @ApiProperty()
    @Column()
    blog_title: string;

    @ApiProperty()
    @Column({ type: 'longtext' })
    blog_content: string;

    @ApiProperty()
    @Column({ type: 'text' })
    blog_image: string;
}
