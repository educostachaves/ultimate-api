import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  botId: string;

  @Prop()
  message: string;

  @Prop()
  reply: string;

  @Prop()
  intent: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
