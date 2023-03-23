import RankingRepository from '../domain/ranking.repo';

export default class RankingQuerier {
  constructor(private repo: RankingRepository) {}

  async execute() {
    return await this.repo.query();
  }
}
