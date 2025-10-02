import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RegisterDto } from '../dto/register.dto';

@ValidatorConstraint()
export class IsPasswordMatchingDecorator implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Passwords do not matching";
  }

  validate(passwordRepeat: string, validationArguments: ValidationArguments) {
    const obj = validationArguments.object as RegisterDto;
    return passwordRepeat === obj.password;
  }

}