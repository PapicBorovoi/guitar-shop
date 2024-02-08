import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { fillDto } from 'src/shared/utils/common';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.create(dto);
    return fillDto(UserRdo, newUser);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'User created' })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.userService.login(dto);
    return fillDto(UserRdo, user);
  }
}
