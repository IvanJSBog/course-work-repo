import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsPasswordMatchingDecorator implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string;
    validate(passwordRepeat: string, validationArguments: ValidationArguments): boolean;
}
