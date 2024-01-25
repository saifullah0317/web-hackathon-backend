/* eslint-disable prettier/prettier */
import { IsString} from "class-validator"

export class CommentDto{
    @IsString()
    postid:string;

    @IsString()  
    content:string;
}