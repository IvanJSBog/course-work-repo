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
exports.CreateStoreDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateStoreDto {
    title;
    description;
}
exports.CreateStoreDto = CreateStoreDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the store',
        example: 'My Awesome Store',
        required: true,
    }),
    (0, class_validator_1.IsString)({ message: 'title is required' }),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The description of the store',
        example: 'We sell the best gadgets in town.',
        required: true,
    }),
    (0, class_validator_1.IsString)({ message: 'description is required' }),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "description", void 0);
//# sourceMappingURL=create-store.dto.js.map