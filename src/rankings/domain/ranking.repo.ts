import { Ranking } from './ranking';

export default interface RankingRepository {
  createMany: (ranking: Ranking[]) => Promise<Ranking[]>;
}
