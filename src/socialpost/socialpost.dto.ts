/* eslint-disable prettier/prettier */
import { IsString} from "class-validator"

export class SocialpostDto{
    @IsString()
    title:string;

    @IsString()
    content:string;

    image?:string;
}