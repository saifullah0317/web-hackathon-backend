/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Socialpost, SocialpostInterface } from 'src/Schemas/socialpost.schema';


@Injectable()
export class SocialpostService {
  constructor(@InjectModel(Socialpost.name) private socialpostModel: Model<SocialpostInterface>) {}
  async addPost(socialpost):Promise<SocialpostInterface>{
    try{
      const createdPost=await new this.socialpostModel(socialpost);
      return createdPost.save();
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }
  async getByUserid(userid:string):Promise<SocialpostInterface[]>{
    try {
      return await this.socialpostModel.find({userid});
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }
  async getAll():Promise<SocialpostInterface[]>{
    try {
      return await this.socialpostModel.find().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async editPost(id: string, socialpost):Promise<SocialpostInterface>{
    try {
      const updatedPost=await this.socialpostModel.findByIdAndUpdate(id,socialpost,{new:true});
      return updatedPost;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async deletePost(id:string):Promise<SocialpostInterface>{
    try {
      const deletedPost=await this.socialpostModel.findByIdAndDelete(id);
      return deletedPost;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
