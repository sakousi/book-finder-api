import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'My First Blog Post' })
  blog_title: string;

  @ApiProperty({ example: 'This is the content of my first blog post...', type: 'string' })
  blog_content: string;

  @ApiProperty({ type: 'string', format: 'binary', nullable: true })
  blog_image: string;
}
