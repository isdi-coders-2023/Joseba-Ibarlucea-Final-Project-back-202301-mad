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
import { DriverModel } from './server/domain/driver.mongo.model.js';
import DriverRouter from './server/infrastructure/routers/drivers.routers.js';
import DriverMongoRepo from './drivers/infrastructure/drivers.mongo.repo.js';
import TeamDestroyer from './teams/application/team.destroyer.js';
import TeamFinder from './teams/application/team.finder.js';
import TeamSearcher from './teams/application/team.searcher.js';
import TeamUpdater from './teams/application/team.updater.js';
import CircuitCreator from './circuits/application/circuit.creator.js';
import CircuitDestroyer from './circuits/application/circuit.destroyer.js';
import CircuitFinder from './circuits/application/circuit.finder.js';
import CircuitSearcher from './circuits/application/circuit.searcher.js';
import CircuitUpdater from './circuits/application/circuit.updater.js';
import DriverCreator from './drivers/application/driver.creator.js';
import DriverDestroyer from './drivers/application/driver.destroyer.js';
import DriverFinder from './drivers/application/driver.finder.js';
import DriverSearcher from './drivers/application/driver.searcher.js';
import DriverUpdater from './drivers/application/driver.updater.js';
import TeamQuery from './teams/application/team.query.js';
import RankingCreator from './rankings/application/ranking.creator.js';
import RankingMongoRepo from './rankings/infrastructure/ranking.mongo.repo.js';
import { RankingModel } from './server/domain/ranking.mongo.model.js';
import RankingRouter from './server/infrastructure/routers/rankings.routers.js';
import RankingQuerier from './rankings/application/ranking.querier.js';
import CircuitQuerier from './circuits/application/circuit.querier.js';
import DriverQuerier from './drivers/application/driver.querier.js';

const bootstrap = async () => {
  const userRepo = new UserMongoRepo(UserModel);
  const teamRepo = new TeamMongoRepo(TeamModel);
  const circuitRepo = new CircuitMongoRepo(CircuitModel);
  const driverRepo = new DriverMongoRepo(DriverModel);
  const rankingRepo = new RankingMongoRepo(RankingModel);

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
  const teamDestroyer = new TeamDestroyer(teamRepo);
  const teamFinder = new TeamFinder(teamRepo);
  const teamSearcher = new TeamSearcher(teamRepo);
  const teamUpdater = new TeamUpdater(teamRepo);
  const teamQuery = new TeamQuery(teamRepo);

  const teamRouter = new TeamRouter(
    teamQuery,
    teamCreateMany,
    teamCreator,
    teamSearcher,
    teamFinder,
    teamUpdater,
    teamDestroyer
  );

  const circuitCreateMany = new CircuitCreateMany(circuitRepo);
  const circuitCreator = new CircuitCreator(circuitRepo);
  const circuitDestroyer = new CircuitDestroyer(circuitRepo);
  const circuitFinder = new CircuitFinder(circuitRepo);
  const circuitSearcher = new CircuitSearcher(circuitRepo);
  const circuitUpdater = new CircuitUpdater(circuitRepo);
  const circuitQuerier = new CircuitQuerier(circuitRepo);

  const circuitRouter = new CircuitRouter(
    circuitQuerier,
    circuitCreateMany,
    circuitCreator,
    circuitDestroyer,
    circuitFinder,
    circuitSearcher,
    circuitUpdater
  );

  const driverCreateMany = new DriverCreateMany(driverRepo);
  const driverCreator = new DriverCreator(driverRepo);
  const driverDestroyer = new DriverDestroyer(driverRepo);
  const driverFinder = new DriverFinder(driverRepo);
  const driverSearcher = new DriverSearcher(driverRepo);
  const driverUpdater = new DriverUpdater(driverRepo);
  const driverQuerier = new DriverQuerier(driverRepo);

  const driverRouter = new DriverRouter(
    driverQuerier,
    driverCreateMany,
    driverCreator,
    driverDestroyer,
    driverFinder,
    driverSearcher,
    driverUpdater
  );

  const rankingCreator = new RankingCreator(rankingRepo);
  const rankingQuerier = new RankingQuerier(rankingRepo);

  const rankingRouter = new RankingRouter(rankingCreator, rankingQuerier);

  const server = new ExpressServer([
    userRouter,
    teamRouter,
    circuitRouter,
    driverRouter,
    rankingRouter,
  ]);

  server.start(4321);
};

bootstrap();
