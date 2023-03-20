import DriverRepository from '../domain/driver.repo';
import DriverSearcher from './driver.searcher';

describe('Given DriverDestroyer use case', () => {
  const repo = {
    search: jest.fn(),
  } as unknown as DriverRepository;

  const driverSearcher = new DriverSearcher(repo);
  describe('When the execute method is called', () => {
    test('Then repo.search should been called', async () => {
      (repo.search as jest.Mock).mockResolvedValue([]);

      await driverSearcher.execute({ key: 'test', value: 'test' });

      expect(repo.search).toHaveBeenCalled();
    });
  });
});
