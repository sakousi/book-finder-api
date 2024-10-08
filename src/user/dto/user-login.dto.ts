import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
