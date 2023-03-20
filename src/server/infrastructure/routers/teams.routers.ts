import { Router } from 'express';
import { Interceptors } from '../../application/interceptor.js';
import { HTTPError } from '../../../common/error.js';
import ServerRouter from '../../server.router.interface.js';
import TeamCreateMany from '../../../teams/application/team.create.many.js';
import TeamCreator from '../../../teams/application/team.creator.js';
import TeamDestroyer from '../../../teams/application/team.destroyer.js';
import TeamFinder from '../../../teams/application/team.finder.js';
import TeamSearcher from '../../../teams/application/team.searcher.js';
import TeamUpdater from '../../../teams/application/team.updater.js';

export default class TeamRouter implements ServerRouter {
  path: string = '/teams';
  interceptor: Interceptors = new Interceptors();
  router: Router = Router();

  constructor(
    private teamCreateMany: TeamCreateMany,
    private teamCreator: TeamCreator,
    private teamSearcher: TeamSearcher,
    private teamFinder: TeamFinder,
    private teamUpdater: TeamUpdater,
    private teamDestroyer: TeamDestroyer
  ) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.post('/many', async (req, res, next) => {
      try {
        const data = await this.teamCreateMany.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/create', async (req, res, next) => {
      try {
        const { body } = req;

        if (!req.body.name || !req.body.logo || !req.body.championships)
          throw new HTTPError(
            401,
            'Unauthorized',
            'Invalid Name, Logo or Championships'
          );

        const data = await this.teamCreator.execute(body);

        res.status(201);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.get(`/:id`, async (req, res, next) => {
      try {
        if (!req.params.id)
          throw new HTTPError(404, 'Team not found', 'Team id not found');

        const { id } = req.params;
        const response = await this.teamFinder.execute(id);

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:name', async (req, res, next) => {
      try {
        if (!req.body.name)
          throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');

        const data = await this.teamSearcher.execute({
          key: 'name',
          value: req.body.name,
        });

        if (!data.length)
          throw new HTTPError(401, 'Unauthorized', 'username not found');

        res.status(202);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.put('/:id', this.interceptor.logged, async (req, res, next) => {
      try {
        const { id } = req.params;
        const { body } = req;

        const modifiedTeam = {
          id,
          ...body,
        };

        await this.teamUpdater.execute(modifiedTeam);

        res.sendStatus(200);
      } catch (error) {
        next(error);
      }
    });

    this.router.delete(
      '/:id',
      this.interceptor.logged,
      async (req, res, next) => {
        try {
          const { id } = req.params;

          await this.teamDestroyer.execute(id);

          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
