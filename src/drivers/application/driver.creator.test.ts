import DriverRepository from '../domain/driver.repo';
import DriverCreator from './driver.creator';
import { Driver } from '../domain/drivers';

describe('Given DriverCreator use case', () => {
  const repo = {
    create: jest.fn(),
  } as unknown as DriverRepository;

  const driverCreator = new DriverCreator(repo);
  describe('When the execute method is called', () => {
    test('Then repo.create should been called', async () => {
      (repo.create as jest.Mock).mockResolvedValue([]);

      await driverCreator.execute({} as Driver);

      expect(repo.create).toHaveBeenCalled();
    });
  });
});
