import RankingRepository from '../domain/ranking.repo';
import RankingQuerier from './ranking.querier';

describe('Given RankingQuerier', () => {
  const repo = {
    query: jest.fn(),
  } as unknown as RankingRepository;

  const rankingQuerier = new RankingQuerier(repo);
  describe('When the execute method is called', () => {
    test('Then the repo.query should been called', async () => {
      (repo.query as jest.Mock).mockResolvedValue([]);
      await rankingQuerier.execute();

      expect(repo.query).toHaveBeenCalled();
    });
  });
});
