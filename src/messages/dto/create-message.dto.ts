import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  botId: string;

  @ApiProperty()
  @IsString()
  message: string;
}

