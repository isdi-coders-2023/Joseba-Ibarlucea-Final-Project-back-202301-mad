import { RankingModel } from '../../server/domain/ranking.mongo.model';
import { Ranking } from '../domain/ranking';
import RankingRepository from '../domain/ranking.repo';

export default class RankingMongoRepo implements RankingRepository {
  constructor(private mongo: typeof RankingModel) {}

  createMany(ranking: Ranking[]): Promise<Ranking[]> {
    const data = this.mongo.insertMany(ranking);
    return data;
  }

  query(): Promise<Ranking[]> {
    return this.mongo.find();
  }
}
