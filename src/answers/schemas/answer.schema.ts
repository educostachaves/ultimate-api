import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: [String] })
  replies: string[];

  @Exclude()
  _id: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
