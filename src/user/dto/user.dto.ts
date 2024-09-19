import { ApiProperty } from '@nestjs/swagger';
import { BookUserList } from '../../typeorm/JoinEntity/BookUserList';

export class UserDto {
  @ApiProperty()
  user_username: string;

  @ApiProperty()
  user_firstname: string;

  @ApiProperty()
  user_lastname: string;

  @ApiProperty()
  user_mail: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  biography: string;

  @ApiProperty()
  user_phone: string;

  @ApiProperty()
  user_work: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  book_user_list: BookUserList[];
}
