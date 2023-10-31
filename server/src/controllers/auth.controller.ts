import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@prisma/client';
import { AuthService } from '@services/auth.service';

// Define a controller class for handling authentication-related HTTP requests
export class AuthController {
  // Initialize the AuthService instance using Container from typedi
  public auth = Container.get(AuthService);

  // Method to register a new user (sign up)
  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const signUpUserData: Omit<User, 'password'> = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };
  // Method to sign in a user (log in)
  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const { token, findUser } = await this.auth.signin(userData);

      res.status(200).json({ data: { user: findUser, token }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
  // Method to log out a user
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const logOutUserData: User = await this.auth.logout(userData);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
