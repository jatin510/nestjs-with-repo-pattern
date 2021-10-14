import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { WsAuthGuard } from '../../common/auth/guard/ws.guard';

@WebSocketGateway({ namespace: '/habitat/chat' })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('msgToServer')
  public handleMessageToServer(client: Socket, payload: any): any {
    const { room } = payload;
    return this.server.to(room).emit('msgToClient', payload);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinRoom')
  async handleJoiningRoom(
    @ConnectedSocket() client: any,
    @MessageBody() payload: any,
  ) {
    // user from ws guard
    const { roomId } = payload;

    client.join(roomId);

    return { ok: true, message: `user connected to room ${roomId}` };
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinRooms')
  async handleJoiningAllRooms(@ConnectedSocket() client: any) {
    // user from ws guard
    const { user } = client;

    const roomIds: string[] = await this.userApp.getRoomsListForUser(user._id);

    roomIds.forEach((roomId) => {
      client.join(roomId);
    });

    return { ok: true, message: 'user connected to all the rooms' };
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  // @UseGuards(WsAuthGuard)
  // @SubscribeMessage('message')
  // async handleMessage(
  //   @ConnectedSocket() client: any,
  //   @MessageBody() payload: any,
  // ) {
  //   // const auth_token = client.handshake.headers.authorization;
  //   // console.log(auth_token);
  //   // console.log(client.user);

  //   // user from ws guard
  //   const { user } = client;
  //   const { room, msg } = payload;
  //   client.join(room);
  //   this.logger.log('message is recieved');
  //   this.logger.log('room', room);
  //   this.logger.log('message', msg);

  //   // save message in database
  //   const messageInfo = {
  //     rid: room,
  //     userId: user._id,
  //     msg,
  //     ts: new Date(),
  //   };

  //   try {
  //     const message = await this.messageService.saveMessage(messageInfo);
  //     this.server.to(room).emit('msgToClient', message);

  //     this.logger.log('message sent');

  //     return { ok: true, message: 'message sent' };
  //   } catch (error: any) {
  //     return { ok: false, error: error?.message };
  //   }
  // }
}
