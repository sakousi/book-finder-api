import { ApiProperty } from '@nestjs/swagger';
import { BookGenre } from 'src/typeorm/enum/bookGenre';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  book_title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  book_author: string;

  @ApiProperty({ example: 'Scribner' })
  book_editor: string;

  @ApiProperty({ example: 'A classic novel of the Jazz Age', nullable: true })
  book_description?: string;

  @ApiProperty({
    enum: BookGenre,
    example: BookGenre.literaryFiction,
    description: 'Select the genre of the book',
  })
  book_genre: BookGenre;

  @ApiProperty({ example: 'English', nullable: true })
  book_langue?: string;

  @ApiProperty({ type: 'string', format: 'binary', nullable: true })
  book_image?: string;
}
