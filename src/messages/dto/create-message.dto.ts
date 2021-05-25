import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  botId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

