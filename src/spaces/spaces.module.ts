import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Room, RoomSchema } from './entity/room.entity';
import { SpacesController } from './controller/spaces.controller';
import { SPACES_TYPES } from './interfaces/types';
import { CreateUserApplication } from './applications/create.user.application';
import { createMessageService } from './services/create.user.service';

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
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [SpacesController],
  providers: [createMessageApp, createMessageService, RoomsRepository],
  exports: [],
})
export class SpacesModule {}
