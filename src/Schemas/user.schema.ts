/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({unique:true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  name:string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface UserInterface extends mongoose.Document{
  _id:string,
  email:string,
  password:string,
  name:string
}