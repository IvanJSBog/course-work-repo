"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
const is_password_matching_decorator_1 = require("../decorators/is-password-matching.decorator");
class RegisterDto {
    email;
    password;
    passwordRepeat;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'email must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'not valid email format' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'password is required' }),
    (0, class_validator_1.Length)(6, 20, {
        message: 'password must be between 6 and 20 characters long',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'repeat password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'repeat password is required' }),
    (0, class_validator_1.Length)(6, 20, {
        message: 'repeat password must be between 6 and 20 characters long',
    }),
    (0, class_validator_1.Validate)(is_password_matching_decorator_1.IsPasswordMatchingDecorator, {
        message: 'password and repeated password are not matching',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "passwordRepeat", void 0);
//# sourceMappingURL=register.dto.js.map