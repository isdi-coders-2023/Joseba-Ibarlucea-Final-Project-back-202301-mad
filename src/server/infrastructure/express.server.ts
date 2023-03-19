import express, { Express } from 'express';
import { dbConnect } from './db/db.connect.js';
import ServerRouter from '../server.router.interface.js';
import createDebug from 'debug';
import cors from 'cors';

const debug = createDebug('Fntic: Express-server');

export default class ExpressServer {
  app: Express;

  constructor(private routers: ServerRouter[]) {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
  }

  routes(): void {
    this.app.get('/', (_req, resp) => {
      resp.json({
        info: 'Fanat1c',
        endpoints: {
          users: '/users',
        },
      });
    });
    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });
  }

  start(port: number): void {
    debug(`Listening on http://localhost:${port}`);
    dbConnect()
      .then((mongoose) => {
        this.app.listen(port);
        debug('DB:', mongoose.connection.db.databaseName);
      })
      .catch((error) => this.app.emit('error', error));

    this.app.on('error', (error) => {
      debug(error);
    });
  }
}
