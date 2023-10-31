import { PrismaClient, Todo } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { CreateTodoDto } from '@/dtos/todo.dto';

@Service()
export class TodoService {
  // Initialize PrismaClient instances for user and todo models
  public users = new PrismaClient().user;
  public todos = new PrismaClient().todo;

  // Method to create a new Todo
  public async create(todoData: CreateTodoDto): Promise<Todo> {
    const { content, userId } = todoData;
    // Check if content and userId are provided
    if (!content) throw new HttpException(400, 'content is required');
    if (!userId) throw new HttpException(400, 'userId is required');

    // Find the user associated with the provided userId
    const findUser = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, 'User not found');

    // Create a new Todo with the provided content and userId
    const createTodoData = this.todos.create({ data: { content, userId } });
    return createTodoData;
  }
  // Method to fetch all Todos for a specific user
  public async findAll(userId: string): Promise<Todo[]> {
    // Check if userId is provided
    if (!userId) throw new HttpException(400, 'userId is required');

    // Find the user associated with the provided userId
    const findUser = await this.users.findUnique({ where: { id: userId } });

    // Fetch all Todos for the user, ordered by their 'checked' status
    if (!findUser) throw new HttpException(409, 'User not found');
    const findTodos = await this.todos.findMany({ where: { userId }, orderBy: { checked: 'asc' } });
    return findTodos;
  }
  // Method to update a Todo
  public async update(todoId: string, todoData: Todo): Promise<Todo> {
    // Find the Todo associated with the provided todoId
    const findTodo = await this.todos.findUnique({ where: { id: todoId } });
    if (!findTodo) throw new HttpException(409, 'Todo not found');

    // Update the Todo with the provided data
    const updateTodoData = await this.todos.update({
      where: { id: todoId },
      data: todoData,
    });
    return updateTodoData;
  }

  // Method to delete a Todo
  public async delete(todoId: string): Promise<Todo> {
    // Check if todoId is provided
    if (!todoId) throw new HttpException(400, 'todoId is required');

    // Find the Todo associated with the provided todoId
    const findTodo = await this.todos.findUnique({ where: { id: todoId } });
    if (!findTodo) throw new HttpException(409, 'Todo not found');

    // Delete the Todo with the provided todoId
    const deleteTodoData = await this.todos.delete({ where: { id: todoId } });
    return deleteTodoData;
  }
}
