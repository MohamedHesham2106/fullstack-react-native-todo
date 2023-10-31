import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { UserController } from '@/controllers/user.controller';

export class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.user.getUser);
  }
}
