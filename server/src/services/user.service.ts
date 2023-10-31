import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { User } from '@prisma/client';
import { HttpException } from '@/exceptions/HttpException';

@Service()
export class UserService {
  public users = new PrismaClient().user;

  public async getUser(userId: string): Promise<User> {
    if (!userId) throw new HttpException(400, 'id is required');
    const findUser = await this.users.findUnique({
      where: { id: userId },
    });
    if (!findUser) throw new HttpException(409, 'User not found');
    return findUser;
  }
}
