import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiProperty({
    description: 'The title of the store',
    example: 'My Awesome Store',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'title is string' })
  title?: string;
  @ApiProperty({
    description: 'The description of the store',
    example: 'We sell the best gadgets in town.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'description is string' })
  description?: string;
}