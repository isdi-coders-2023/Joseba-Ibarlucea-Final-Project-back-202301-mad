import { RankingModel } from '../../server/domain/ranking.mongo.model';
import RankingMongoRepo from './ranking.mongo.repo';

describe('Given RankingMongoRepo', () => {
  const mockModel = {
    find: jest.fn(),
    insertMany: jest.fn(),
  } as unknown as typeof RankingModel;

  const repo = new RankingMongoRepo(mockModel);

  describe('When the repo.createMany method is called', () => {
    test('Then model.insertMany should been called', async () => {
      (mockModel.insertMany as jest.Mock).mockResolvedValue([]);

      await repo.createMany([]);

      expect(mockModel.insertMany).toHaveBeenCalled();
    });
  });
  describe('When the repo.query method is called', () => {
    test('Then model.find should been called', async () => {
      (mockModel.find as jest.Mock).mockResolvedValue([{ id: '2' }]);

      await repo.query();

      expect(mockModel.find).toHaveBeenCalled();
    });
  });
});
