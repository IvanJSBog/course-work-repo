import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'email must be a string' })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'not valid email format' })
  email: string;

  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @Length(6, 20, {
    message: 'password must be between 6 and 20 characters long',
  })
  password: string;
}