import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entity/user.entity';
import { UsersController } from './controller/users.controller';
import { USER_TYPES } from './interfaces/types';
import { CreateUserApplication } from './applications/create.user.application';
import { CreateUserService } from './services/create.user.service';
import { UsersRepository } from './repository/user.repository';

const createUserApp = {
  provide: USER_TYPES.applications.ICreateUserApplication,
  useClass: CreateUserApplication,
};

const createUserService = {
  provide: USER_TYPES.services.ICreateUserService,
  useClass: CreateUserService,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [createUserApp, createUserService, UsersRepository],
  exports: [],
})
export class UsersModule {}
