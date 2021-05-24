import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, ArrayUnique, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(120, {
    each: true,
  })
  @ArrayUnique()
  @IsNotEmpty()
  replies: string[];
}
