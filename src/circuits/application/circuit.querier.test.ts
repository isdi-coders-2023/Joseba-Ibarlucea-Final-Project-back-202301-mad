import CircuitRepository from '../domain/circuit.repo';
import CircuitQuerier from './circuit.querier';

describe('Given CircuitQuerier use case', () => {
  const repo = {
    query: jest.fn(),
  } as unknown as CircuitRepository;

  const circuitQuerier = new CircuitQuerier(repo);
  describe('When the execute method is called', () => {
    test('Then repo.query should been called', async () => {
      (repo.query as jest.Mock).mockReturnValue([{ location: 'city' }]);

      await circuitQuerier.execute();

      expect(repo.query).toHaveBeenCalled();
    });
  });
});
