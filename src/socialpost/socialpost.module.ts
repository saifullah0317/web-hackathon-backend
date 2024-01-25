/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Socialpost, SocialpostSchema } from 'src/Schemas/socialpost.schema';
import { SocialpostController } from './socialpost.controller';
import { SocialpostService } from './socialpost.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Socialpost.name, schema: SocialpostSchema }]), AuthModule],
  controllers: [SocialpostController],
  providers: [SocialpostService],
//   exports:[FollowService]
})
export class SocialpostModule {}