/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Post, Body, ValidationPipe, HttpException, HttpStatus, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/Schemas/user.schema';
import { LoginDto } from 'src/users/login.dto';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService,
    private userService:UsersService, private readonly authService:AuthService) {}

    @Get()
    async getByid(@Req() req):Promise<UserInterface>{
      try{
        const userid=await this.authService.getUseridByToken(req.cookies);
        return this.userService.getByid(userid)
      }
      catch(e){
        throw new HttpException(e,HttpStatus.BAD_REQUEST);
      }
    }

  @Post('login')
  async login(@Body(new ValidationPipe()) body:LoginDto, @Res({ passthrough: true }) res) {
    try{
      const userId=await this.userService.login(body);
      if(userId.userId==""){
        return {message:"Invalid credentials!"}
      }
      const token= this.jwtService.sign(userId);
      res.cookie('user_token',token, {
        httpOnly: true,
        // secure: false,
        // sameSite: 'lax',
        expires: new Date(Date.now() + 3600000),
      });
      return {token};
    }
    catch(e){
      throw new HttpException(e,HttpStatus.NOT_FOUND);
    }
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) body:UserDto, @Res({ passthrough: true }) res){
    try{
      const user=await this.userService.add(body);
      const token=this.jwtService.sign({userId:user._id});
      res.cookie('user_token', token, {
        expires: new Date(Date.now() + 3600000),
      });
      return {token};
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    }
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res) {
    try{
      res.cookie('user_token', '', { expires: new Date(Date.now()) });
      return {message:"loggedout!"};
    }
    catch(e){
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    }
  }
}
