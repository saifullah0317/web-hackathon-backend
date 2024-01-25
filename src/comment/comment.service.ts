/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Comment, CommentInterface } from 'src/Schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentInterface>) {}
  async addComment(comment):Promise<CommentInterface>{
    try{
      const createdComment=await new this.commentModel(comment);
      return createdComment .save();
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }
  async getByPostid(postid:string):Promise<CommentInterface[]>{
    try {
      return await this.commentModel.find({postid});
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }
//   async getAll():Promise<CommentInterface[]>{
//     try {
//       return await this.commentModel.find().exec();
//     } catch (error) {
//       throw new HttpException(error, HttpStatus.BAD_REQUEST);
//     }
//   }
  async editComment(id: string, comment):Promise<CommentInterface>{
    try {
      const updatedComment=await this.commentModel.findByIdAndUpdate(id,comment,{new:true});
      return updatedComment;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteComment(id:string):Promise<CommentInterface>{
    try {
      const deletedComment=await this.commentModel.findByIdAndDelete(id);
      return deletedComment;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  
}
