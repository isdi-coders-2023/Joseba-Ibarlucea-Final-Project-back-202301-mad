import createDebug from 'debug';
import UserRouter from './server/infrastructure/routers/users.routers.js';
import UserRegister from './users/application/user.register.js';
import UserLogin from './users/application/user.login.js';
import UserFinder from './users/application/user.finder.js';
import UserUpdater from './users/application/user.updater.js';
import UserDestroyer from './users/application/user.destroyer.js';
import UserMongoRepo from './users/infrastructure/user.mongo.repo.js';
import { UserModel } from './server/domain/user.mongo.model.js';
import ExpressServer from './server/express.server.js';
const debug = createDebug('Fntic: app');

const bootstrap = async () => {

  const repo = new UserMongoRepo(UserModel);

  const userRegister = new UserRegister(repo);
  const userLogin = new UserLogin(repo);
  const userFinder = new UserFinder(repo);
  const userUpdater = new UserUpdater(repo);
  const userDestroyer = new UserDestroyer(repo);
  const userRouter = new UserRouter(
    userRegister,
    userLogin,
    userFinder,
    userUpdater,
    userDestroyer
  );

  const server = new ExpressServer([userRouter]);

  server.start(4321);
};

bootstrap();
