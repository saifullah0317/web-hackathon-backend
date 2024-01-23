/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Follow {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    userid:User;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    toFollowid:User;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);

export interface FollowInterface extends mongoose.Document{
  _id:string,
  userid:string,
  toFollowid:string
}