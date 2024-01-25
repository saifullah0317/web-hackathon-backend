/* eslint-disable prettier/prettier */
import { Body, Controller, Post, ValidationPipe, Req, HttpException, HttpStatus, Get, Put, Delete, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthService } from 'src/auth/auth.service';
import { CommentDto } from './comment.dto';
import { CommentInterface } from 'src/Schemas/comment.schema';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService, private readonly authService: AuthService) {}
  @Post()
  async add(@Req() req, @Body (new ValidationPipe()) body:CommentDto):Promise<CommentInterface>{
    try{
      const tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      return await this.commentService.addComment(tempObj);
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    }
  }
//   @Get('all')
//   async getAll():Promise<SocialpostInterface[]>{
//     try {
//       return await this.socialpostService.getAll();
//     } catch (error) {
//       throw new HttpException(error, HttpStatus.BAD_REQUEST);
//     }
//   }
  @Get(':postid')
  async getByPostid(@Param('postid') postid:string):Promise<CommentInterface[]>{
    try {
      return await this.commentService.getByPostid(postid);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Put(':id')
  async editComment(@Param('id') id:string, @Req() req, @Body (new ValidationPipe()) body:CommentDto):Promise<CommentInterface>{
    try {
      const tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      return await this.commentService.editComment(id, tempObj);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':id')
  async deleteComment(@Param('id') id:string):Promise<CommentInterface>{
    try {
      return await this.commentService.deleteComment(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  
}
