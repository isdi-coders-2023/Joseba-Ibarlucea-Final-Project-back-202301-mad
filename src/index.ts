import createDebug from 'debug';
import UserRouter from './server/infrastructure/routers/users.routers.js';
import UserRegister from './users/application/user.register.js';
import UserLogin from './users/application/user.login.js';
import UserFinder from './users/application/user.finder.js';
import UserUpdater from './users/application/user.updater.js';
import UserDestroyer from './users/application/user.destroyer.js';
import UserMongoRepo from './users/infrastructure/user.mongo.repo.js';
import { UserModel } from './server/domain/user.mongo.model.js';
import ExpressServer from './server/infrastructure/express.server.js';
import TeamRouter from './server/infrastructure/routers/teams.routers.js';
import TeamCreator from './teams/application/team.creator.js';
import TeamMongoRepo from './teams/infrastructure/team.mongo.repo.js';
import { TeamModel } from './server/domain/team.mongo.model.js';
import TeamCreateMany from './teams/application/team.create.many.js';
import CircuitCreateMany from './circuits/application/circuit.create.many.js';
import CircuitMongoRepo from './circuits/infrastructure/circuit.mongo.repo.js';
import { CircuitModel } from './server/domain/circuit.mongo.model.js';
import CircuitRouter from './server/infrastructure/routers/circuits.routers.js';
import DriverCreateMany from './drivers/application/driver.create.many.js';
import { DriverModel } from './server/domain/driver.mongo.repo.js';
import DriverRouter from './server/infrastructure/routers/drivers.routers.js';
import DriverMongoRepo from './drivers/infrastructure/drivers.mongo.repo.js';

const debug = createDebug('Fntic: app');

const bootstrap = async () => {
  const userRepo = new UserMongoRepo(UserModel);
  const teamRepo = new TeamMongoRepo(TeamModel);
  const circuitRepo = new CircuitMongoRepo(CircuitModel);
  const driverRepo = new DriverMongoRepo(DriverModel);

  const userRegister = new UserRegister(userRepo);
  const userLogin = new UserLogin(userRepo);
  const userFinder = new UserFinder(userRepo);
  const userUpdater = new UserUpdater(userRepo);
  const userDestroyer = new UserDestroyer(userRepo);
  const userRouter = new UserRouter(
    userRegister,
    userLogin,
    userFinder,
    userUpdater,
    userDestroyer
  );

  const teamCreator = new TeamCreator(teamRepo);
  const teamCreateMany = new TeamCreateMany(teamRepo);

  const teamRouter = new TeamRouter(
    teamCreateMany,
    teamCreator,
    userRegister,
    userLogin,
    userFinder,
    userUpdater,
    userDestroyer
  );

  const circuitCreateMany = new CircuitCreateMany(circuitRepo);

  const circuitRouter = new CircuitRouter(circuitCreateMany, teamCreator);

  const driverCreateMany = new DriverCreateMany(driverRepo);

  const driverRouter = new DriverRouter(driverCreateMany, teamCreator);

  const server = new ExpressServer([
    userRouter,
    teamRouter,
    circuitRouter,
    driverRouter,
  ]);

  server.start(4321);
};

bootstrap();
