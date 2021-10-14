import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repository/user.repository';
import { IGetUserService } from '../interfaces/services/get.user.service.interface';

@Injectable()
export class GetUserService implements IGetUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getById(id: string) {
    return this.usersRepository.findOne({
      _id: id,
    });
  }
}
