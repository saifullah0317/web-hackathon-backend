/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Socialpost } from './socialpost.schema';

@Schema()
export class Comment {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    userid:User;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Socialpost'})
    postid:Socialpost;

    @Prop()
    content:string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export interface CommentInterface extends mongoose.Document{
  _id:string,
  userid:string,
  postid:string,
  content:string
}