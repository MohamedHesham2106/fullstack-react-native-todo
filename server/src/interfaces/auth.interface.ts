import { Request } from 'express';
import { User } from '@prisma/client';

export interface DataStoredInToken {
  id: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
