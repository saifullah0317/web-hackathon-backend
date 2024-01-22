/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI),ConfigModule.forRoot({isGlobal:true}), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
