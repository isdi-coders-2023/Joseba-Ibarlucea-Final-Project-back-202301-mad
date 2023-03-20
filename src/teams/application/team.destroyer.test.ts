import TeamDestroyer from './team.destroyer';
import TeamRepository from '../domain/team.repo';

describe('Given TeamDestroyer use case', () => {
  const repo = {
    delete: jest.fn(),
  } as unknown as TeamRepository;

  const teamDestroyer = new TeamDestroyer(repo);
  describe('When the execute method is called', () => {
    test('Then repo.delete should been called', async () => {
      (repo.delete as jest.Mock).mockResolvedValue([]);

      await teamDestroyer.execute('2');

      expect(repo.delete).toHaveBeenCalled();
    });
  });
});
