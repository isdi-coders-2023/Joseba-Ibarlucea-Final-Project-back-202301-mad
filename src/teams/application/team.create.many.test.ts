import TeamCreateMany from './team.create.many';
import TeamRepository from '../domain/team.repo';

describe('Given TeamCreateMany use case', () => {
  const repo = {
    createMany: jest.fn(),
  } as unknown as TeamRepository;

  const teamCreateMany = new TeamCreateMany(repo);
  describe('When the execute method is called', () => {
    test('Then repo.createMany should been called', async () => {
      (repo.createMany as jest.Mock).mockResolvedValue([]);

      await teamCreateMany.execute([]);

      expect(repo.createMany).toHaveBeenCalled();
    });
  });
});
