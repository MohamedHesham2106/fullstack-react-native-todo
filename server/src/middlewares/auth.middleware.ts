import { PrismaClient } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

// Function to extract the "Authorization" token from the request's headers
const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};
// Middleware for authenticating requests using a JSON Web Token (JWT)
export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      // Verify the JWT and extract the user's "id" from the token
      const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const users = new PrismaClient().user;
      // Find the user based on the "id" extracted from the token
      const findUser = await users.findUnique({ where: { id: String(id) } });
      if (findUser) {
        // If the user is found, continue to the next middleware or route
        next();
      } else {
        // If the user is not found, return an "Unauthorized" error
        next(new HttpException(401, 'Unauthorized.'));
      }
    } else {
      // If there is no "Authorization" token, return a "Token Missing" error
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    // If there's an error in token verification, return an "Unauthorized" error
    next(new HttpException(401, 'Unauthorized.'));
  }
};
