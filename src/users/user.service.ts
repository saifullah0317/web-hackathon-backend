/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schemas/user.schema';
import { UserDto } from './user.dto';
import { UserInterface } from 'src/Schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserInterface>) {}

  async login(body):Promise<any>{
    try{
      const loggedinUser=await this.getByEmail(body.email);
      if(!loggedinUser){
        throw new HttpException('Invalid email',HttpStatus.NOT_FOUND);
      }
      else{
        if(body.password!=loggedinUser.password){
          throw new HttpException('Invalid password',HttpStatus.UNAUTHORIZED);
        }
        else{
          return {userId:loggedinUser._id.toString()};
        }
      }
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST);
    }
  }

  async getall():Promise<User[]>{
    return await this.userModel.find().exec();
  }

  async add(createUserDto: UserDto): Promise<UserInterface> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getByEmail(email:string): Promise<UserInterface> {
    const userData=await this.userModel.findOne({email:email});
    if(!userData){
        throw new NotFoundException('Invalid email !');
    }
    return userData;
  }
  async getByid(id:string):Promise<UserInterface>{
    const userData=await this.userModel.findById(id);
    if(!userData){
        throw new HttpException('User not found',HttpStatus.NOT_FOUND);
    }
    return userData;
  }

  async updateUser(id:string,body:UserDto): Promise<User> {
    const updatedUser=await this.userModel.findByIdAndUpdate(id,body,{new:true});
    if(!updatedUser){
        throw new NotFoundException(`User ${body.email} not found...!`);
    }
    return updatedUser;
  }
}
