import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'bob@gmail.com',
    description: 'The email of the User',
    required: true,
  })
  @IsEmail({}, { message: 'Invalid email' })
  public email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the User',
    required: true,
  })
  @IsString()
  public password: string;

  @ApiProperty({
    example: 'Bob',
    description: 'The name of the User',
    required: true,
  })
  @IsString()
  public name: string;
}
