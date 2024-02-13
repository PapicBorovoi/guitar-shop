import { Command } from './command.interface';
import { PrismaClient } from '@prisma/client';
import { seedDb } from '../../shared/mock/seed';
import axios from 'axios';
import { User } from 'src/shared/types/user.interface';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count] = parameters;
    const itemCount = Number.parseInt(count, 10);
    const prismaClient = new PrismaClient();
    let user: User;

    try {
      const { data } = await axios.post<User>(
        `http://${process.env.HOST}:${process.env.PORT}/user/login`,
        {
          email: 'admin@admin.com',
          password: 'admin1',
        },
      );
      user = data;
    } catch (err) {
      const { data } = await axios.post<User>(
        `http://${process.env.HOST}:${process.env.PORT}/user/register`,
        {
          email: 'admin@admin.com',
          password: 'admin1',
          name: 'admin',
        },
      );
      user = data;
    }

    try {
      await seedDb(prismaClient, itemCount, user.id);
      globalThis.process.exit(0);
    } catch (err) {
      console.error(err);
      globalThis.process.exit(1);
    } finally {
      await prismaClient.$disconnect();
    }
  }
}
