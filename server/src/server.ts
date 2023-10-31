import { App } from '@/app';

import { ValidateEnv } from '@utils/validateEnv';
import { AuthRoute } from './routes/auth.route';
import { TodoRoute } from './routes/todo.route';
import { UserRoute } from './routes/user.route';

ValidateEnv();

const app = new App([new AuthRoute(), new TodoRoute(), new UserRoute()]);

app.listen();
