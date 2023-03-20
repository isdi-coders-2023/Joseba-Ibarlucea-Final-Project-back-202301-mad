import CircuitCreator from './circuit.creator';
import CircuitRepository from '../domain/circuit.repo';
import { Circuit } from '../domain/circuit';

describe('Given CircuitDestroyer use case', () => {
  const repo = {
    create: jest.fn(),
  } as unknown as CircuitRepository;

  const circuitDestroyer = new CircuitCreator(repo);
  describe('When the execute method is called', () => {
    test('Then repo.create should been called', async () => {
      (repo.create as jest.Mock).mockResolvedValue([]);

      await circuitDestroyer.execute({} as Circuit);

      expect(repo.create).toHaveBeenCalled();
    });
  });
});
