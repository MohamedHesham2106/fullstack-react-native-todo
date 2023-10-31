import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateTodoDto } from '@/dtos/todo.dto';
import { TodoController } from '@/controllers/todo.controller';

// Define a class for handling Todo-related routes
export class TodoRoute implements Routes {
  // Define the base path for Todo-related routes
  public path = '/todo';
  public router = Router();
  public todo = new TodoController();

  constructor() {
    this.initializeRoutes();
  }
  // Method to set up and initialize the Todo-related routes
  private initializeRoutes() {
    // Define routes and associated middleware
    this.router.post(`${this.path}`, ValidationMiddleware(CreateTodoDto), AuthMiddleware, this.todo.create);
    this.router.get(`${this.path}`, AuthMiddleware, this.todo.getAll);
    this.router.patch(`${this.path}/:id`, AuthMiddleware, this.todo.update);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.todo.delete);
  }
}
