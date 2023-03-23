import { Router } from 'express';
import RankingCreator from '../../../rankings/application/ranking.creator.js';
import RankingQuerier from '../../../rankings/application/ranking.querier.js';
import { Interceptors } from '../../application/interceptor.js';
import ServerRouter from '../../server.router.interface.js';

export default class RankingRouter implements ServerRouter {
  path: string = '/rankings';
  interceptor: Interceptors = new Interceptors();
  router: Router = Router();

  constructor(
    private rankingCreator: RankingCreator,
    private rankingQuerier: RankingQuerier
  ) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.post('/add', async (req, res, next) => {
      const data = await this.rankingCreator.execute(req.body);

      res
        .json({
          results: data,
        })
        .send(201);
    });

    this.router.get('/', async (req, res, next) => {
      const data = await this.rankingQuerier.execute();
      res.json({
        results: data,
      });
    });
  }
}
