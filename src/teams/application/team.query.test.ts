import TeamQuery from './team.query';
import TeamRepository from '../domain/team.repo';

describe('Given TeamQuery use case', () => {
  const repo = {
    query: jest.fn(),
  } as unknown as TeamRepository;

  const teamQuery = new TeamQuery(repo);
  describe('When the execute method is called', () => {
    test('Then repo.query should been called', async () => {
      (repo.query as jest.Mock).mockResolvedValue([]);

      await teamQuery.execute();

      expect(repo.query).toHaveBeenCalled();
    });
  });
});
