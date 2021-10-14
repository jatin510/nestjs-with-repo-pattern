import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../modules/users/users.service';
import { IUser } from '../../modules/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) return null;

    const password: string = user?.services?.password?.bcrypt;

    const isValidPassword = await bcrypt.compare(pass, password);
    if (isValidPassword) {
      return user;
    } else {
      return null;
    }
  }

  async login(user: any) {
    const { username, id } = user;
    const payload = { username, id };
    return {
      access_token: this.createJwtToken(payload),
      userId: id,
      user,
    };
  }

  createJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
