import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}


//
//"id": "34d7831e137a4016a55f98926800a643",
//    "name": "Greeting",
//    "description": "The visitor says hello.",
//    "trainingData": {
//      "messages": [
//        {
//          "id": "6399fd6989984c7b871c6301744b0af5",
//          "text": "Hello"
//        },
//        {
//          "id": "68bafebc2a2e4843a56a221c2ceb12ed",
//          "text": "Hi"
//        },
//        {
//          "id": "b2a3208dc801432992812638368e0668",
//          "text": "Good morning!"
//        }
//      ]
//    },
//    "reply": {
//      "id": "f35d7e0936a44102bac9cb96c81eec3b",
//      "text": "Hello :) How can I help you?"
//    }
// },
