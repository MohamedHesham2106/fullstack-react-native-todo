import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  public content: string;
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
