import { Router } from 'express';
import { Interceptors } from '../../application/interceptor.js';
import { HTTPError } from '../../../common/error.js';
import ServerRouter from '../../server.router.interface.js';
import CircuitCreateMany from '../../../circuits/application/circuit.create.many.js';
import CircuitCreator from '../../../circuits/application/circuit.creator.js';
import CircuitDestroyer from '../../../circuits/application/circuit.destroyer.js';
import CircuitFinder from '../../../circuits/application/circuit.finder.js';
import CircuitSearcher from '../../../circuits/application/circuit.searcher.js';
import CircuitUpdater from '../../../circuits/application/circuit.updater.js';

export default class CircuitsRouter implements ServerRouter {
 
  path: string = '/circuits';
  interceptor: Interceptors = new Interceptors();
  router: Router = Router();

  constructor(
    private circuitCreateMany: CircuitCreateMany,
    private circuitCreator: CircuitCreator,
    private circuitDestroyer: CircuitDestroyer,
    private circuitFinder: CircuitFinder,
    private circuitSearcher: CircuitSearcher,
    private circuitUpdater: CircuitUpdater
  ) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.post('/many', async (req, res, next) => {
      try {
        const data = await this.circuitCreateMany.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/create', async (req, res, next) => {
      try {
        const data = await this.circuitCreator.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.get(`/:id`, async (req, res, _next) => {
      const { id } = req.params;
      const response = await this.circuitFinder.execute(id);

      res.status(200).json(response);
    });

    this.router.get('/:location', async (req, res, next) => {
      try {
        const { location } = req.params;

        if (!location)
          throw new HTTPError(404, 'Not Found', 'Circuit location not found');

        const data = await this.circuitSearcher.execute(req.body.location);

        res.json({ results: [data] }).sendStatus(200);
      } catch (error) {
        next(error);
      }
    });

    this.router.put('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const { body } = req;

        const modifiedCircuit = {
          id,
          ...body,
        };

        await this.circuitUpdater.execute(modifiedCircuit);
        res.sendStatus(200);
      } catch (error) {
        next(error);
      }
    });

    this.router.delete('/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        if (!id)
          throw new HTTPError(404, 'Id not found', 'Circuit id not found');

        await this.circuitDestroyer.execute(id);
        res.sendStatus(204);
      } catch (error) {
        next(error);
      }
    });
  }
}
