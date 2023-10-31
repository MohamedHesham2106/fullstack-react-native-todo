import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  public name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(100)
  public password: string;
}
export class AuthUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(100)
  public password: string;
}
