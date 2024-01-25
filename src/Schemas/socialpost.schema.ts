/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Socialpost {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    userid:User;
    
    @Prop()
    title:string;
    
    @Prop()
    content:string;
    
    @Prop({required:false})
    image?:string;
}

export const SocialpostSchema = SchemaFactory.createForClass(Socialpost);

export interface SocialpostInterface extends mongoose.Document{
  _id:string,
  userid:string,
  title:string,
  content:string,
  image?:string
}