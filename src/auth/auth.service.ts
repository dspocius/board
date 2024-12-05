import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user.length == 0) {
      return null;
    }
    if (user && (await this.usersService.validatePassword(pass, user[0].password))) {
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }

  async register(user: any) {
    const userFind = await this.usersService.findOne(user.email);
    if (userFind.length > 0) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Email used',
      }, HttpStatus.FORBIDDEN, {
        cause: "Email used"
      });
      } else {
      const reg = (await this.usersService.register(user.email,user.password));
        return reg;
    }
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const res = await this.validateUser(user.email, user.password);
    if (res) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
