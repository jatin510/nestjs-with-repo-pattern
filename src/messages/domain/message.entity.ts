import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  rid: string;

  @Prop()
  msg: string;

  @Prop()
  ts: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
