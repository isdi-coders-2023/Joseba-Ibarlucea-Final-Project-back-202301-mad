import CircuitCreateMany from './circuit.create.many';
import CircuitRepository from '../domain/circuit.repo';

describe('Given CircuitDestroyer use case', () => {
  const repo = {
    createMany: jest.fn(),
  } as unknown as CircuitRepository;

  const circuitDestroyer = new CircuitCreateMany(repo);
  describe('When the execute method is called', () => {
    test('Then repo.createMany should been called', async () => {
      (repo.createMany as jest.Mock).mockResolvedValue([]);

      await circuitDestroyer.execute([]);

      expect(repo.createMany).toHaveBeenCalled();
    });
  });
});
