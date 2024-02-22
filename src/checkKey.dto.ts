import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckKeyDto {
  @ApiProperty({ example: '5giyiry8j4u' })
  @IsString()
  key: string;
}