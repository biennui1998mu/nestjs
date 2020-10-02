import { IsString, Matches, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(7, {message: 'Gmail at least 7 character include @***.***'})
    gmail: string;

    @IsString()
    @MinLength(8, {message: 'Password at least 8 character'})
    // @Matches() RegExp
    password: string;
}