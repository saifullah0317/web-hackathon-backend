/* eslint-disable prettier/prettier */
import { IsEmail} from "class-validator"

export class FollowDto{
    @IsEmail()
    email:string;
}