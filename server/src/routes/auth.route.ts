import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, AuthUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

// Define a class for handling authentication-related routes
export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  // Constructor to initialize routes
  constructor() {
    this.initializeRoutes();
  }
  // Method to set up and initialize authentication-related routes
  private initializeRoutes() {
    // Define routes for user registration (sign-up), user login (sign-in), and user logout
    this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post(`${this.path}login`, ValidationMiddleware(AuthUserDto), this.auth.signIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
  }
}
