import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginRdo {
  @ApiProperty({
    type: String,
    description: 'User ID',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    type: String,
    description: 'User email',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    type: String,
    description: 'User name',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Access token',
  })
  @Expose()
  public accessToken: string;
}
