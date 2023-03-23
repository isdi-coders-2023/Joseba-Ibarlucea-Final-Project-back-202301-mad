import RankingRepository from '../domain/ranking.repo';
import RankingCreator from './ranking.creator';

describe('Given RankingCreator', () => {
  const repo = {
    createMany: jest.fn(),
  } as unknown as RankingRepository;

  const rankingCreator = new RankingCreator(repo);
  describe('When the execute method is called', () => {
    test('Then repo.createMany should been called', async () => {
      (repo.createMany as jest.Mock).mockResolvedValue([{ position: 1 }]);

      await rankingCreator.execute([]);

      expect(repo.createMany).toHaveBeenCalled();
    });
  });
});
