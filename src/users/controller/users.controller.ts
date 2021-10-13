import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { UserDomain } from '../domain/user.domain';
import { USER_TYPES } from '../interfaces/types';
import { ICreateUserApplication } from '../interfaces/applications/create.user.application.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_TYPES.applications.ICreateUserApplication)
    private createUserApp: ICreateUserApplication,
  ) {}

  @Post('/')
  async create(@Res() res: any, @Body() userDomain: UserDomain) {
    try {
      const user = await this.createUserApp.create(userDomain);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.CREATED,
        message: `${user.name} successfully created`,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }
}
