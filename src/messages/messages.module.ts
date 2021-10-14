import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Message, MessageSchema } from './domain/message.entity';
import { MessageGateway } from './gateway/message.gateway';
import { MESSAGE_TYPES } from './interfaces/types';
import { CreateMessageApplication } from './applications/create.message.application';
import { CreateMessageService } from './services/create.message.service';

const createMessageApp = {
  provide: MESSAGE_TYPES.applications.ICreateMessageApplication,
  useClass: CreateMessageApplication,
};

const createMessageService = {
  provide: MESSAGE_TYPES.services.ICreateMessageService,
  useClass: CreateMessageService,
};
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [],
  providers: [MessageGateway, createMessageService, createMessageApp],
  exports: [],
})
export class MessagesModule {}
