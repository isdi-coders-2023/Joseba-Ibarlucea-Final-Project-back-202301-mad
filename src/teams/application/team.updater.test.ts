import TeamUpdater from './team.updater';
import TeamRepository from '../domain/team.repo';
import Team from '../domain/team';

describe('Given TeamUpdater use case', () => {
  const repo = {
    update: jest.fn(),
  } as unknown as TeamRepository;

  const teamUpdater = new TeamUpdater(repo);
  describe('When the execute method is called', () => {
    test('Then repo.update should been called', async () => {
      (repo.update as jest.Mock).mockResolvedValue([]);

      await teamUpdater.execute({} as Team);

      expect(repo.update).toHaveBeenCalled();
    });
  });
});
