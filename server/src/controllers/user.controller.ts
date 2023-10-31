import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@prisma/client';
import { UserService } from '@services/user.service';

export class UserController {
  public user = Container.get(UserService);
  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const findUser: User = await this.user.getUser(userId);
      res.status(200).json({ data: findUser, message: 'get user' });
    } catch (error) {
      next(error);
    }
  };
}
