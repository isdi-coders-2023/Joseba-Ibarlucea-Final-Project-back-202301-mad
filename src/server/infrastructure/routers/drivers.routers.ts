import { Router } from 'express';
import { Interceptors } from '../../application/interceptor.js';
import { HTTPError } from '../../../common/error.js';
import ServerRouter from '../../server.router.interface.js';
import DriverCreateMany from '../../../drivers/application/driver.create.many.js';
import DriverCreator from '../../../drivers/application/driver.creator.js';
import DriverDestroyer from '../../../drivers/application/driver.destroyer.js';
import DriverFinder from '../../../drivers/application/driver.finder.js';
import DriverSearcher from '../../../drivers/application/driver.searcher.js';
import DriverUpdater from '../../../drivers/application/driver.updater.js';

export default class DriverRouter implements ServerRouter {
  path: string = '/drivers';
  interceptor: Interceptors = new Interceptors();
  router: Router = Router();

  constructor(
    private driverCreateMany: DriverCreateMany,
    private driverCreator: DriverCreator,
    private driverDestroyer: DriverDestroyer,
    private driverFinder: DriverFinder,
    private driverSearcher: DriverSearcher,
    private driverUpdater: DriverUpdater
  ) {
    this.registerControllers();
  }

  registerControllers(): void {
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
        const data = await this.driverCreator.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.get(`/:id`, async (req, res, next) => {
      try {
        const { id } = req.params;
        if (!id) throw new HTTPError(404, 'Not Found', 'Driver id not found');
        const response = await this.driverFinder.execute(id);

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

    this.router.get(`/:name`, async (req, res, next) => {
      try {
        const { name } = req.params;
        if (!name) throw new HTTPError(404, 'Not Found', 'Driver not found');
        const response = await this.driverSearcher.execute(req.body.name);

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

    this.router.put('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const { body } = req;
        if (!id) throw new HTTPError(404, 'Not Found', 'Driver not found');

        await this.driverUpdater.execute(body);

        res.sendStatus(200);
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        if (!id) throw new HTTPError(404, 'Not found', 'Driver not found');

        await this.driverDestroyer.execute(id);

        res.sendStatus(204);
      } catch (error) {
        next(error);
      }
    });
  }
}
