import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TodoService } from '@services/todo.service';
import { CreateTodoDto } from '@/dtos/todo.dto';
import { Todo } from '@prisma/client';

// Define a controller for handling Todo-related HTTP requests
export class TodoController {
  // Initialize the TodoService instance using Container from typedi
  public todo = Container.get(TodoService);

  // Method to create a new Todo
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoData: CreateTodoDto = req.body;
      const createTodoData: CreateTodoDto = await this.todo.create(todoData);

      res.status(201).json({ data: createTodoData, message: 'create' });
    } catch (error) {
      next(error);
    }
  };
  // Method to fetch all Todos for a specific user
  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.query.userId);
      const todos: Todo[] = await this.todo.findAll(userId);
      res.status(201).json({ data: todos, message: 'get all' });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a Todo
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoId = String(req.params.id);
      const todoData: Todo = req.body;
      const updateTodoData: Todo = await this.todo.update(todoId, todoData);
      res.status(201).json({ data: updateTodoData, message: 'update' });
    } catch (error) {
      next(error);
    }
  };
  // Method to delete a Todo
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoId = String(req.params.id);
      const deleteTodoData: Todo = await this.todo.delete(todoId);
      res.status(201).json({ data: deleteTodoData, message: 'delete' });
    } catch (error) {
      next(error);
    }
  };
}
