/* eslint-disable prettier/prettier */
import { Body, Controller, Post, ValidationPipe, Req, HttpException, HttpStatus } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowInterface } from 'src/Schemas/follow.schema';
import { AuthService } from 'src/auth/auth.service';
import { FollowDto } from './follow.dto';
// import { Follow } from 'src/Schemas/follow.schema';
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService, private readonly authService: AuthService) {}
  // add a new user
  @Post()
  async add(@Req() req, @Body (new ValidationPipe()) body:FollowDto):Promise<FollowInterface>{
    try{
      const tempObj=JSON.parse(JSON.stringify(body));
      tempObj.userid=await this.authService.getUseridByToken(req.cookies);
      return this.followService.add(tempObj);
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    }
  }
}
