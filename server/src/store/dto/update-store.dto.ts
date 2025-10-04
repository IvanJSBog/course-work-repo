import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiProperty({
    description: 'The title of the store',
    example: 'My Awesome Store',
  })
  @IsString({ message: 'title is required' })
  title?: string;
  @ApiProperty({
    description: 'The description of the store',
    example: 'We sell the best gadgets in town.',
  })
  @IsString({ message: 'description is required' })
  description?: string;
}