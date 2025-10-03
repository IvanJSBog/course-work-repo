import { IsEmail, IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { IsPasswordMatchingDecorator } from '../decorators/is-password-matching.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Уникальный email пользователя',
    example: 'user@example.com',
    required: true,
  })
  @IsString({ message: 'email must be a string' })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'not valid email format' })
  email: string;

  @ApiProperty({
    description: 'Пароль для входа (от 6 до 20 символов)',
    example: 'strongPassword123',
    required: true,
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @Length(6, 20, {
    message: 'password must be between 6 and 20 characters long',
  })
  password: string;

  @ApiProperty({
    description: 'Повтор пароля (должен совпадать с password)',
    example: 'strongPassword123',
    required: true,
    minLength: 6,
    maxLength: 20,
  })
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