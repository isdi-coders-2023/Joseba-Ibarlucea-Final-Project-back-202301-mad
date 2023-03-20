import DriverRepository from '../domain/driver.repo';
import DriverCreateMany from './driver.create.many';

describe('Given DriverCreateMany use case', () => {
  const repo = {
    createMany: jest.fn(),
  } as unknown as DriverRepository;

  const driverCreateMany = new DriverCreateMany(repo);
  describe('When the execute method is called', () => {
    test('Then repo.createMany should been called', async () => {
      (repo.createMany as jest.Mock).mockResolvedValue([]);

      await driverCreateMany.execute([]);

      expect(repo.createMany).toHaveBeenCalled();
    });
  });
});
