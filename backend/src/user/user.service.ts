import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
