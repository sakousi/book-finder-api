import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    mail: string,
    pass: string,
  ): Promise<{ access_token: string; user: UserDto }> {
    const user: UserDto | null = await this.usersService.findOneByMail(mail);

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const verify: boolean = await argon.verify(user?.password, pass);

    if (!verify) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    const payload = { user_mail: user.user_mail };
    const newUser: UserDto = user;
    delete user.password;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: newUser,
    };
  }

  async validateToken(
    token: string,
  ): Promise<{ isValid: boolean; user?: UserDto }> {
    try {
      const decoded = this.jwtService.verify(token);
      const user: UserDto = await this.usersService.findOneByMail(decoded.sub);

      if (user) {
        delete user.password;
        return { isValid: true, user };
      } else {
        return { isValid: false };
      }
    } catch {
      return { isValid: false };
    }
  }
}
