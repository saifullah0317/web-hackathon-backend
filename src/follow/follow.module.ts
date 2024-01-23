/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from 'src/Schemas/follow.schema';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]), AuthModule, UsersModule],
  controllers: [FollowController],
  providers: [FollowService],
//   exports:[FollowService]
})
export class FollowModule {}