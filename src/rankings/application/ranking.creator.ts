import { Ranking } from '../domain/ranking';
import RankingRepository from '../domain/ranking.repo';

export default class RankingCreator {
  constructor(private repo: RankingRepository) {}

  async execute(rankings: Ranking[]) {
    const data = await this.repo.createMany(rankings);
    return data;
  }
}
