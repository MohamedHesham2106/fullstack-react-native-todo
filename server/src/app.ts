import 'reflect-metadata';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compressFilter from '@utils/compressFilter.util';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

// Define a class for creating and configuring the Express application
export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    // Initialize various middlewares and error handling
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  // Start the Express server
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  // Get the Express application instance
  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    // Request logging middleware
    this.app.use(morgan(LOG_FORMAT, { stream }));
    // Cross-Origin Resource Sharing (CORS) middleware
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    // Security headers middleware
    this.app.use(helmet());
    // Response compression middleware
    this.app.use(compression());
    // JSON body parsing middleware
    this.app.use(express.json());
    // URL-encoded body parsing middleware
    this.app.use(express.urlencoded({ extended: true }));
    // Additional compression middleware with a custom filter
    this.app.use(compression({ filter: compressFilter }));
  }
  // Initialize routes for the application
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
  // Initialize error handling middleware
  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
