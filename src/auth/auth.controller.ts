import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: UserLoginDto,
  ): Promise<{ access_token: string; user: UserDto }> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('validateToken')
  validateToken(
    @Body('token') token: string,
  ): Promise<{ isValid: boolean; user?: UserDto }> {
    return this.authService.validateToken(token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req;
  }

  // @Post('register')
  // register(@Body() userDTO: CreateUserDto): Promise<UserDto> {
  //   return this.userService.create(userDTO);
  // }
}
