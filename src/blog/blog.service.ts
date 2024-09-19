import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepository.create(createBlogDto);
    return this.blogRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { ID_blog: id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    Object.assign(blog, updateBlogDto);
    return this.blogRepository.save(blog);
  }

  async remove(id: number): Promise<void> {
    const blog = await this.findOne(id);
    await this.blogRepository.remove(blog);
  }
}
