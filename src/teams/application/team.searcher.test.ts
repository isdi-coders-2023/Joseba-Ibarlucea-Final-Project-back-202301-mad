import TeamSearcher from './team.searcher';
import TeamRepository from '../domain/team.repo';

describe('Given TeamSearcher use case', () => {
  const repo = {
    search: jest.fn(),
  } as unknown as TeamRepository;

  const teamSearcher = new TeamSearcher(repo);
  describe('When the execute method is called', () => {
    test('Then repo.search should been called', async () => {
      (repo.search as jest.Mock).mockResolvedValue([]);

      await teamSearcher.execute({ key: 'test', value: 'test' });

      expect(repo.search).toHaveBeenCalled();
    });
  });
});
