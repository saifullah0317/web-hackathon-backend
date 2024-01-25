/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Body, Param, Req, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SocialpostService } from './socialpost.service';
import { SocialpostDto } from './socialpost.dto';
import { SocialpostInterface } from 'src/Schemas/socialpost.schema';
@Controller('socialpost')
export class SocialpostController {
  constructor(private readonly socialpostService: SocialpostService, private readonly authService: AuthService) {}
  @Post()
  async add(@Req() req, @Body (new ValidationPipe()) body:SocialpostDto):Promise<SocialpostInterface>{
    try{
      const tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      return await this.socialpostService.addPost(tempObj);
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    }
  }
  @Get('all')
  async getAll():Promise<SocialpostInterface[]>{
    try {
      return await this.socialpostService.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('')
  async getByUserid(@Req() req):Promise<SocialpostInterface[]>{
    try {
      const userid=await req.cookies;
      return await this.socialpostService.getByUserid(userid);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Put(':id')
  async editPost(@Param('id') id:string, @Req() req, @Body (new ValidationPipe()) body:SocialpostDto):Promise<SocialpostInterface>{
    try {
      const tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      return await this.socialpostService.editPost(id, tempObj);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':id')
  async deletePost(@Param('id') id:string):Promise<SocialpostInterface>{
    try {
      return await this.socialpostService.deletePost(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
