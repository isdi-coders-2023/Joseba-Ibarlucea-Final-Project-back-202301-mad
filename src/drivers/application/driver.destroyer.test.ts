import DriverRepository from '../domain/driver.repo';
import DriverDestroyer from './driver.destroyer';

describe('Given DriverDestroyer use case', () => {
  const repo = {
    delete: jest.fn(),
  } as unknown as DriverRepository;

  const driverDestroyer = new DriverDestroyer(repo);
  describe('When the execute method is called', () => {
    test('Then repo.delete should been called', async () => {
      (repo.delete as jest.Mock).mockResolvedValue([]);

      await driverDestroyer.execute('2');

      expect(repo.delete).toHaveBeenCalled();
    });
  });
});
