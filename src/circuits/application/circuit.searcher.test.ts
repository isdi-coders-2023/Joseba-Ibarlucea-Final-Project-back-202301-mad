import CircuitSearcher from './circuit.searcher';
import CircuitRepository from '../domain/circuit.repo';

describe('Given CircuitDestroyer use case', () => {
  const repo = {
    search: jest.fn(),
  } as unknown as CircuitRepository;

  const circuitDestroyer = new CircuitSearcher(repo);
  describe('When the execute method is called', () => {
    test('Then repo.search should been called', async () => {
      (repo.search as jest.Mock).mockResolvedValue([]);

      await circuitDestroyer.execute({ key: 'test', value: 'test' });

      expect(repo.search).toHaveBeenCalled();
    });
  });
});
