import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const lastMessage = {
  _id: { type: String },
  rid: { type: String },
  msg: { type: String },
  ts: { type: Date },
  _updatedAt: { type: Date },
};

const user = {
  _id: { type: String },
  username: { type: String },
};

interface ILastMessage {
  _id: string;
  rid: string;
  msg: string;
  ts: Date;
  _updatedAt: Date;
}

interface IUser {
  _id: string;
  username: string;
}

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  t: string;

  @Prop()
  usersCount: number;

  @Prop({ default: 0 })
  msgs: number;

  @Prop()
  ts: Date;

  @Prop()
  uids: Array<string>;

  @Prop()
  usernames: Array<string>;

  @Prop()
  ro: boolean;

  @Prop()
  name: string;

  @Prop()
  fname: string;

  @Prop(raw({ type: lastMessage }))
  lastMessage: ILastMessage;

  @Prop(raw({ type: user }))
  u: IUser;

  @Prop()
  topic: string;

  @Prop()
  prid: string;

  @Prop()
  mentions: string[];

  @Prop()
  channels: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
