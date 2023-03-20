import CircuitUpdater from './circuit.updater';
import CircuitRepository from '../domain/circuit.repo';
import { Circuit } from '../domain/circuit';

describe('Given CircuitDestroyer use case', () => {
  const repo = {
    update: jest.fn(),
  } as unknown as CircuitRepository;

  const circuitDestroyer = new CircuitUpdater(repo);
  describe('When the execute method is called', () => {
    test('Then repo.update should been called', async () => {
      (repo.update as jest.Mock).mockResolvedValue([]);

      await circuitDestroyer.execute({} as Circuit);

      expect(repo.update).toHaveBeenCalled();
    });
  });
});
