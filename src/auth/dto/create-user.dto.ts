import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  password: string;

  @IsString()
  @MinLength(1)
  fullname: string;
}
