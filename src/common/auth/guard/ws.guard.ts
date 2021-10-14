import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../../modules/users/users.service';
import { jwtConstants } from '../constants';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(bearerToken, {
        secret: jwtConstants.secret,
      }) as any;
      return new Promise((resolve, reject) => {
        return this.userService.findOne(decoded.id).then((user) => {
          if (user) {
            // after verifying the user
            // add user in the req body
            context.args[0].user = user;
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
