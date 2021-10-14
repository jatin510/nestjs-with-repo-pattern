import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/create.user.dto';
import { USER_TYPES } from '../interfaces/types';
import { ICreateUserService } from '../interfaces/services/create.user.service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_TYPES.services.ICreateUserService)
    private createUserService: ICreateUserService,
  ) {}

  @Post('/')
  async create(@Res() res: any, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserService.create(createUserDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.CREATED,
        message: `${user.name} successfully created`,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }
}
