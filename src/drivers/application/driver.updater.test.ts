import DriverRepository from '../domain/driver.repo';
import { Driver } from '../domain/drivers';
import DriverUpdater from './driver.updater';

describe('Given DriverUpdater use case', () => {
  const repo = {
    update: jest.fn(),
  } as unknown as DriverRepository;

  const driverUpdater = new DriverUpdater(repo);
  describe('When the execute method is called', () => {
    test('Then repo.update should been called', async () => {
      (repo.update as jest.Mock).mockResolvedValue([]);

      await driverUpdater.execute({} as Driver);

      expect(repo.update).toHaveBeenCalled();
    });
  });
});
