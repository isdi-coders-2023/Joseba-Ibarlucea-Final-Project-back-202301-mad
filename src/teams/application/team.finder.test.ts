import TeamFinder from './team.finder';
import TeamRepository from '../domain/team.repo';

describe('Given TeamFinder use case', () => {
  const repo = {
    find: jest.fn(),
  } as unknown as TeamRepository;

  const teamFinder = new TeamFinder(repo);
  describe('When the execute method is called', () => {
    test('Then repo.find should been called', async () => {
      (repo.find as jest.Mock).mockResolvedValue([]);

      await teamFinder.execute('2');

      expect(repo.find).toHaveBeenCalled();
    });
  });
});
