import { IsEmail, IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { IsPasswordMatchingDecorator } from '../decorators/is-password-matching.decorator';

export class RegisterDto {
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

  @IsString({ message: 'repeat password must be a string' })
  @IsNotEmpty({ message: 'repeat password is required' })
  @Length(6, 20, {
    message: 'repeat password must be between 6 and 20 characters long',
  })
  @Validate(IsPasswordMatchingDecorator, {
    message: 'password and repeated password are not matching',
  })
  passwordRepeat: string;
}
