import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Confirm password must match password' })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
