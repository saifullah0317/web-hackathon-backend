/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), MongooseModule.forRoot(process.env.MONGO_URI), UsersModule, AuthModule, FollowModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
