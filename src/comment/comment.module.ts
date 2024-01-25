/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from 'src/Schemas/comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
//   exports:[FollowService]
})
export class CommentModule {}