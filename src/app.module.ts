/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follow/follow.module';
import { SocialpostModule } from './socialpost/socialpost.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), MongooseModule.forRoot(process.env.MONGO_URI), UsersModule, AuthModule, FollowModule, SocialpostModule,CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
