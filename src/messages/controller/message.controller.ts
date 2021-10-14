import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { CreateMessageDto } from '../dto/create.message.dto';
import { MESSAGE_TYPES } from '../interfaces/types';
import { ICreateMessageApplication } from '../interfaces/applications/create.message.application.interface';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject(MESSAGE_TYPES.applications.ICreateMessageApplication)
    private createMessageApp: ICreateMessageApplication,
  ) {}

  @Post('/sendMessage')
  async createMessage(
    @Res() res: any,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    try {
      await this.createMessageApp.create(createMessageDto);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.CREATED,
        message: `Message received`,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }
}
