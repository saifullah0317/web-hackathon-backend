/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow, FollowInterface } from 'src/Schemas/follow.schema';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class FollowService {
  constructor(@InjectModel(Follow.name) private followModel: Model<FollowInterface>, private readonly userService:UsersService) {}
  async add(doFollow): Promise<FollowInterface> {
    try{
      const userToFollow=await this.userService.getByEmail(doFollow.email);
      if(!userToFollow){
        throw new HttpException(`User ${userToFollow.email} do not exist!`,HttpStatus.NOT_FOUND);
      }
      const addFollow={
        userid:doFollow.userid,
        toFollowid:userToFollow._id
      }
      const createdUser = new this.followModel(addFollow);
      return createdUser.save();
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }
}
