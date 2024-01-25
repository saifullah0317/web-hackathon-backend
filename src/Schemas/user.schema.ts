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

  @Prop({required:false})
  image?:string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface UserInterface extends mongoose.Document{
  _id:string,
  email:string,
  password:string,
  name:string,
  image?:string
}

export interface ReturnUser extends mongoose.Document{
  email:string,
  name:string,
  image?:string
}