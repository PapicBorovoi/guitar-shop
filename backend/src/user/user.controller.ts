import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { fillDto } from 'src/shared/utils/common';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginRdo } from './rdo/login.rdo';
import { JWTAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { TokenPayload } from 'src/shared/types/token.interface';

type RequestWithUser = {
  user?: TokenPayload;
};

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.create(dto);
    const accessToken = await this.userService.createUserToken(newUser);
    return fillDto(LoginRdo, { ...newUser.toPojo(), accessToken });
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'User created' })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.userService.login(dto);
    const accessToken = await this.userService.createUserToken(user);
    return fillDto(LoginRdo, { ...user.toPojo(), accessToken });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token is valid',
  })
  @UseGuards(JWTAuthGuard)
  @Get('check')
  public async checkToken(@Req() { user }: RequestWithUser) {
    await this.userService.validateUser(user);
    return fillDto(UserRdo, { ...user });
  }
}
