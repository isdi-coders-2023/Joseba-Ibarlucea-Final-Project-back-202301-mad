import DriverRepository from '../domain/driver.repo';
import DriverQuerier from './driver.querier';

describe('Given driverQuerier use case', () => {
  const repo = {
    query: jest.fn(),
  } as unknown as DriverRepository;

  const driverQuerier = new DriverQuerier(repo);
  describe('When the execute method is called', () => {
    test('Then repo.query should been called', async () => {
      (repo.query as jest.Mock).mockResolvedValue([{ name: 'pepe' }]);

      await driverQuerier.execute();

      expect(repo.query).toHaveBeenCalled();
    });
  });
});
