import { AuthUser } from 'src/shared/types/user.interface';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements AuthUser {
  id?: number;
  name: string;
  email: string;
  passwordHash: string;

  constructor(user: AuthUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }

  public toPojo(): AuthUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  static from(user: AuthUser): UserEntity {
    return new UserEntity(user);
  }
}
