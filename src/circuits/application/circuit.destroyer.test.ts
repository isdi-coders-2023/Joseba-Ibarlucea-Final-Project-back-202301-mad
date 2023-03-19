import CircuitDestroyer from './circuit.destroyer';
import CircuitRepository from '../domain/circuit.repo';

describe('Given CircuitDestroyer use case', () => {
  const repo = {
    delete: jest.fn(),
  } as unknown as CircuitRepository;

  const circuitDestroyer = new CircuitDestroyer(repo);
  describe('When the execute method is called', () => {
    test('Then repo.delete should been called', async () => {
      (repo.delete as jest.Mock).mockResolvedValue([]);

      await circuitDestroyer.execute('2');

      expect(repo.delete).toHaveBeenCalled();
    });
  });
});
