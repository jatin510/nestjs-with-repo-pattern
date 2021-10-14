import { Injectable, Inject } from '@nestjs/common';

import { ICreateMessageApplication } from '../interfaces/applications/create.message.application.interface';
import { MESSAGE_TYPES } from '../interfaces/types';
import { ICreateMessageService } from '../interfaces/services/create.message.service.interface';

@Injectable()
export class CreateMessageApplication implements ICreateMessageApplication {
  constructor(
    @Inject(MESSAGE_TYPES.services.ICreateMessageService)
    private messageService: ICreateMessageService,
  ) {}

  async create(message: any): Promise<any> {
    return this.messageService.create(message);
  }
}
