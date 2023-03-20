import TeamCreator from './team.creator';
import TeamRepository from '../domain/team.repo';
import { Team } from '../domain/team';

describe('Given TeamCreator use case', () => {
  const repo = {
    create: jest.fn(),
  } as unknown as TeamRepository;

  const teamCreator = new TeamCreator(repo);
  describe('When the execute method is called', () => {
    test('Then repo.create should been called', async () => {
      (repo.create as jest.Mock).mockResolvedValue([]);

      await teamCreator.execute({} as Team);

      expect(repo.create).toHaveBeenCalled();
    });
  });
});
