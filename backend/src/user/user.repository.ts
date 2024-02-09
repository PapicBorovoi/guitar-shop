import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  public async create(userEntity: UserEntity): Promise<UserEntity> {
    const newUser = new this.userModel(userEntity);
    return UserEntity.from(await newUser.save());
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return null;
    }

    return UserEntity.from(user);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return null;
    }

    return UserEntity.from(user);
  }
}
