import { Injectable } from '@nestjs/common';

import { MessagesRepository } from '../repository/message.repository';
import { ICreateMessageService } from '../interfaces/services/create.message.service.interface';

@Injectable()
export class CreateMessageService implements ICreateMessageService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async create(messageObj: any) {
    const { roomId, message } = messageObj;
    return this.messagesRepository.create({
      rid: roomId,
      msg: message,
      ts: Date.now(),
    });
  }
}
