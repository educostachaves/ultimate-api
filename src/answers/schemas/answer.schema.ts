import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {

  @Prop({ unique: true })
  name: string;

  @Prop({ type: [String] })
  replies: string[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
