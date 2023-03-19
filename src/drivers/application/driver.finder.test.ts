import DriverRepository from '../domain/driver.repo';
import DriverFinder from './driver.finder';

describe('Given DriverFinder use case', () => {
  const repo = {
    find: jest.fn(),
  } as unknown as DriverRepository;

  const driverFinder = new DriverFinder(repo);
  describe('When the execute method is called', () => {
    test('Then repo.find should been called', async () => {
      (repo.find as jest.Mock).mockResolvedValue([]);

      await driverFinder.execute('2');

      expect(repo.find).toHaveBeenCalled();
    });
  });
});
