import CircuitFinder from './circuit.finder';
import CircuitRepository from '../domain/circuit.repo';

describe('Given CircuitDestroyer use case', () => {
  const repo = {
    find: jest.fn(),
  } as unknown as CircuitRepository;

  const circuitDestroyer = new CircuitFinder(repo);
  describe('When the execute method is called', () => {
    test('Then repo.find should been called', async () => {
      (repo.find as jest.Mock).mockResolvedValue([]);

      await circuitDestroyer.execute('2');

      expect(repo.find).toHaveBeenCalled();
    });
  });
});
