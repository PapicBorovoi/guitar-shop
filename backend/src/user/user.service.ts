import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenPayload } from 'src/shared/types/token.interface';
import { AuthUser } from 'src/shared/types/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async create(dto: CreateUserDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser = await new UserEntity({
      ...dto,
      passwordHash: '',
    }).setPassword(dto.password);

    return await this.userRepository.create(newUser);
  }

  public async login(dto: LoginUserDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user || !(await user.comparePassword(dto.password))) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }

  public async createUserToken(user: AuthUser) {
    return await this.jwtService.signAsync(this.createTokenPayload(user));
  }

  private createTokenPayload(user: AuthUser): TokenPayload {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  public async validateUser(payload: TokenPayload) {
    const user = await this.userRepository.findById(payload.id);

    if (!user) {
      throw new BadRequestException('User has been deleted');
    }

    return user;
  }
}
