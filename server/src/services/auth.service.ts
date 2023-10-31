import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@prisma/client';
import { DataStoredInToken } from '@/interfaces/auth.interface';

// Define a service class for handling authentication-related operations
@Service()
export class AuthService {
  // Initialize a PrismaClient instance for the user model
  public users = new PrismaClient().user;

  // Method to register a new user
  public async signup(userData: CreateUserDto): Promise<User> {
    // Check if a user with the provided email already exists
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    // Hash the user's password
    const hashedPassword = await hash(userData.password, 10);

    // Create a new user with the provided data and hashed password
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  // Method to sign in a user
  public async signin(userData: CreateUserDto): Promise<{ token: string; findUser: User }> {
    // Find a user with the provided email
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    // Check if the provided password matches the user's hashed password
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    // Create a token for the user
    const tokenData = this.createToken(findUser);

    return { token: tokenData, findUser };
  }
  // Method to log out a user
  public async logout(userData: User): Promise<User> {
    // Find a user with the provided email and password
    const findUser: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
  // Method to create a JSON Web Token (JWT) for user authentication
  public createToken(user: User): string {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24 * 30; // 30 days in seconds
    const token = sign(dataStoredInToken, secretKey, { expiresIn });
    return token;
  }
}
