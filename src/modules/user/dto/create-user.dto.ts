// -> INI UNTUK VALIDASAI DATA

import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createUserDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  profilePic!: string;
}
