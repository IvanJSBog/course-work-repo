import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({
    description: 'The title of the store',
    example: 'My Awesome Store',
    required: true,
  })
  @IsString({ message: 'title is required' })
  title: string;
  @ApiProperty({
    description: 'The description of the store',
    example: 'We sell the best gadgets in town.',
    required: true,
  })
  @IsString({ message: 'description is required' })
  description: string;
}