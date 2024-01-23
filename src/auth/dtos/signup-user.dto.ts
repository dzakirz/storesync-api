import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
