import { Router } from 'express';
import { Interceptors } from '../../application/interceptor.js';
import { HTTPError } from '../../../common/error.js';
import { Auth } from '../../application/auth.js';
import ServerRouter from '../../server.router.interface.js';
import { TokenPayload } from '../../domain/interface.js';
import TeamCreateMany from '../../../teams/application/team.create.many.js';
import TeamCreator from '../../../teams/application/team.creator.js';
import DriverCreateMany from '../../../drivers/application/driver.create.many.js';

export default class DriverRouter implements ServerRouter {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  path: string = '/drivers';
  interceptor: Interceptors = new Interceptors();
  router: Router = Router();

  constructor(
    private driverCreateMany: DriverCreateMany,
    private teamCreator: TeamCreator
  ) {
    this.registerControllers();
  }

  registerControllers(): void {
    // this.router.get(`/:id`, async (req, res, _next) => {
    //   const { id } = req.params;
    //   const response = await this.userFinder.execute(id);

    //   res.status(200).json(response);
    // });

    this.router.post('/many', async (req, res, next) => {
      try {
        const data = await this.driverCreateMany.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.post('/create', async (req, res, next) => {
      try {
        const data = await this.teamCreator.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
