import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repository/user.repository';
import { ICreateUserService } from '../interfaces/services/create.user.service.interface';
import { UserDomain } from '../domain/user.domain';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(user: UserDomain) {
    const { name, email, password, phone } = user;
    return this.usersRepository.create({
      name,
      email,
      password,
      phone,
    });
  }
}
