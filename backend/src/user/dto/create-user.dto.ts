import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

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
  @MaxLength(12)
  @MinLength(6)
  public password: string;

  @ApiProperty({
    example: 'Bob',
    description: 'The name of the User',
    required: true,
  })
  @IsString()
  @MaxLength(15)
  @MinLength(1)
  public name: string;
}
